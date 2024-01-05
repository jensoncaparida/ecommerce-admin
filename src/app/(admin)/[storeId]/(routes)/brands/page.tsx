import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { BrandColumn } from './components/columns';
import { BrandContent } from './components/content';

async function BrandsPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const brands = await prisma.brand.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBrands: BrandColumn[] = brands.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <BrandContent data={formattedBrands} />
    </div>
  );
}

export default BrandsPage;
