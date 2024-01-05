'use client';

import axios from 'axios';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Size } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alertModal';

interface SizeFormProps {
  initialData: Size | null;
}

type SizeFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Size name must be at least 2 characters long',
  }),
  value: z.string().min(1, {
    message: 'Size value must be at least 1 characters long',
  }),
});

export const SizeForm = ({ initialData }: SizeFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Size' : 'Create Size';
  const description = initialData
    ? 'Edit your store size'
    : 'Add a new size to your store';
  const toastMessage = initialData
    ? 'Size updated succesfully.'
    : 'Size created succesfully.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error('Something went wrong.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success('Size deleted succesfully.');
    } catch (error) {
      toast.error('Make sure you removed all products using this size first.');
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this size?"
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center justify-between">
          <Heading title={title} description={description} />
          {initialData && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[400px] space-y-8"
          >
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
                      placeholder="Size name"
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Size value"
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};
