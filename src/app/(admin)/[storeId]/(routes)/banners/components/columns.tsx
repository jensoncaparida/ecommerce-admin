'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye } from 'lucide-react';

import { Actions } from './actions';
import { Button } from '@/components/ui/button';
import { ImageModal } from '@/components/modals/imageModal';

export type BannerColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: 'label',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-4 cursor-pointer hover:text-black dark:hover:text-white"
        >
          Label
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <ImageModal
            imageUrl={row.original.imageUrl}
            isOpen={open}
            onClose={() => setOpen(false)}
          />
          <Button size="sm" onClick={() => setOpen(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
