'use client';

import axios from 'axios';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Store } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApiAlert } from '@/components/ui/apiAlert';
import { useOrigin } from '@/hooks/useOrigin';
import { SubHeading } from '@/components/ui/subHeading';

interface GeneralTabProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(2).max(20, {
    message: 'Store name must be less than 20 characters long',
  }),
});

type GeneralTabValues = z.infer<typeof formSchema>;

export const GeneralTab = ({ initialData }: GeneralTabProps) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [loading, setLoading] = useState(false);

  const form = useForm<GeneralTabValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: GeneralTabValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('Store updated.');
    } catch (error) {
      toast.error('Something went wrong.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="space-y-4 border p-4 rounded-xl">
          <SubHeading title="Store" description="Manage store entity" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-[400px]"
            >
              <div>
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
                          placeholder="Store name"
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 border p-4 rounded-xl">
          <SubHeading title="API" description="Manage API for this store" />
          <ApiAlert
            title="STORE_API_URL"
            description={`${origin}/api/${params.storeId}`}
            variant="public"
          />
        </div>
      </div>
    </>
  );
};
