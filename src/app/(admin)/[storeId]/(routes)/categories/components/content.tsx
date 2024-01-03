'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { ApiList } from '@/components/ui/apiList';

import { CategoryColumn, columns } from './columns';

interface CategoryContentProps {
  data: CategoryColumn[];
}

export const CategoryContent = ({ data }: CategoryContentProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title={`Categories(${data.length})`}
            description="MManage and create categories for your store"
          />
          <Button
            onClick={() => router.push(`/${params.storeId}/categories/new`)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="name" />
        <Heading title="API" description="API calls for categories" />
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </>
  );
};
