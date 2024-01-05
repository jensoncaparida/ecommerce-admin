'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { ApiList } from '@/components/ui/apiList';

import { BrandColumn, columns } from './columns';

interface BrandContentProps {
  data: BrandColumn[];
}

export const BrandContent = ({ data }: BrandContentProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title={`Brands(${data.length})`}
            description="Manage and create brands for your store"
          />
          <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="name" />
        <Heading title="API" description="API calls for brands" />
        <Separator />
        <ApiList entityName="brands" entityIdName="brandId" />
      </div>
    </>
  );
};
