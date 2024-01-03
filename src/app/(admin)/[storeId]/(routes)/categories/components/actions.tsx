'use client';

import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { MoreHorizontal, Edit, Trash, Copy } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alertModal';

import { CategoryColumn } from './columns';

interface ActionsProps {
  data: CategoryColumn;
}

export const Actions: React.FC<ActionsProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onEdit = () => {
    router.push(`/${params.storeId}/categories/${data.id}`);
  };

  const onConfirm = async () => {
    const response = await axios.get(
      `/api/${params.storeId}/categories/${data.id}`,
    );
    const category = response.data;

    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      toast.success('Category deleted successfully.');
      router.refresh();
    } catch (error) {
      if (category.isParent === true) {
        toast.error(
          'Make sure you removed all sub categories using this category first.',
        );
      } else {
        toast.error(
          'Make sure you removed all products using this category first.',
        );
      }
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Category ID copied to clipboard.');
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this category?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
