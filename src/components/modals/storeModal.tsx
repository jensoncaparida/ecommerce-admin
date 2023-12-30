'use client';

import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/useStoreModal';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Store name must be at least 2 characters long',
    })
    .max(16, {
      message: 'Store name must be less than 16 characters long',
    }),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);

      window.location.assign(`/${response.data.id}`);

      toast.success('Store created successfully!');
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a Store"
      description="Add a new store to manage products and orders."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="E-Commerce Store"
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex pt-6 space-x-2 items-center justify-end">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
