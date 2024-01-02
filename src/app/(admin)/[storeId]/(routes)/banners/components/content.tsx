'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/dataTable';
import { ApiList } from '@/components/ui/apiList';

import { BannerColumn, columns } from './columns';

interface BannerContentProps {
  data: BannerColumn[];
}

export const BannerContent = ({ data }: BannerContentProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title={`Banners(${data.length})`}
            description="Manage and create banners for your store"
          />
          <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </Button>
        </div>
        <Separator />
        <DataTable columns={columns} data={data} searchKey="label" />
        <Heading title="API" description="API calls for banners" />
        <Separator />
        <ApiList entityName="banners" entityIdName="bannerId" />
      </div>
    </>
  );
};
