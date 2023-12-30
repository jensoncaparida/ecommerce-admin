'use client';

import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AlertCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { AlertModal } from '@/components/modals/alertModal';
import { Button } from '@/components/ui/button';
import { SubHeading } from '@/components/ui/subHeading';

export const DangerZoneTab = () => {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted.');
    } catch (error) {
      toast.error('Make sure you removed all products and categories first.');
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this store?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex justify-between border p-4 rounded-xl">
        <div className="space-y-4">
          <SubHeading
            title="Delete Store"
            description="Delete the entire store including all entities and datas "
          />
          <p className="flex items-center text-muted-foreground text-sm">
            <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
            This action is irreversible and all data will be deleted
            <AlertCircle className="w-4 h-4 ml-2 text-red-500" />
          </p>
        </div>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <AlertCircle className="w-4 h-4 mr-2" />
          Delete Store
        </Button>
      </div>
    </>
  );
};
