'use client';

import axios from 'axios';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Brand } from '@prisma/client';
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

interface BrandFormProps {
  initialData: Brand | null;
}

type BrandFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Brand name must be at least 2 characters long',
  }),
});

export const BrandForm = ({ initialData }: BrandFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Brand' : 'Create Brand';
  const description = initialData
    ? 'Edit your store brand.'
    : 'Add a new brand to your store.';
  const toastMessage = initialData
    ? 'Brand updated succesfully.'
    : 'Brand created succesfully.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  const onSubmit = async (data: BrandFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/brands/${params.brandId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/brands`, data);
      }
      router.push(`/${params.storeId}/brands`);
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
      await axios.delete(`/api/${params.storeId}/brands/${params.brandId}`);
      router.push(`/${params.storeId}/brands`);
      router.refresh();
      toast.success('Brand deleted succesfully.');
    } catch (error) {
      toast.error('Make sure you removed all products using this brand first.');
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this brand?"
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
                      placeholder="Brand name"
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
