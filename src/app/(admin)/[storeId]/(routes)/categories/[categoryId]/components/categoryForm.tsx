'use client';

import axios from 'axios';
import * as z from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Category, Banner } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Category name must be at least 2 characters long',
  }),
  bannerId: z.string().min(2, {
    message: 'Banner must be selected',
  }),
  isParent: z.boolean(),
  parentId: z.string().min(2, {
    message: 'Parent category must be selected',
  }),
});

interface CategoryFormProps {
  initialData: Category | null;
  bannersData: Banner[];
  categoriesData: Category[];
}

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm = ({
  initialData,
  bannersData,
  categoriesData,
}: CategoryFormProps) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Category' : 'Create Category';
  const description = initialData
    ? 'Edit your store category.'
    : 'Add a new category to your store.';
  const toastMessage = initialData
    ? 'Category updated succesfully.'
    : 'Category created succesfully.';
  const action = initialData ? 'Save Changes' : 'Create';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      bannerId: '',
      isParent: false,
      parentId: '',
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data,
        );
      } else {
        if (data.parentId === 'none' || data.parentId === '') {
          await axios.post(`/api/${params.storeId}/categories`, {
            ...data,
            isParent: true,
          });
        } else {
          await axios.post(`/api/${params.storeId}/categories`, data);
        }
      }
      router.push(`/${params.storeId}/categories`);
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
    const response = await axios.get(
      `/api/${params.storeId}/categories/${params.categoryId}`,
    );
    const category = response.data;

    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );
      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast.success('Category deleted succesfully.');
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
      setLoading(false);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        title="Are you sure to delete this category?"
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
              name="bannerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a banner"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">none</SelectItem>
                      {bannersData.map((banner) => (
                        <SelectItem key={banner.id} value={banner.id}>
                          {banner.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-4">
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
                        placeholder="Category name"
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">none</SelectItem>
                        {categoriesData.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
