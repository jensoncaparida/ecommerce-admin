import prisma from '@/lib/prisma';

import { BrandForm } from './components/brandForm';

export default async function BrandPage({
  params,
}: {
  params: {
    storeId: string;
    brandId: string;
  };
}) {
  const brand = await prisma.brand.findUnique({
    where: {
      id: params.brandId,
    },
  });
  return (
    <div className="px-10 py-4">
      <BrandForm initialData={brand} />
    </div>
  );
}
