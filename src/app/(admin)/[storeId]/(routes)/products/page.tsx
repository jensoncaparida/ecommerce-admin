import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { ProductColumn } from './components/columns';
import { ProductContent } from './components/content';
import { formatter } from '@/lib/utils';

async function ProductsPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      brand: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    brand: item.brand.name,
    size: item.size.name,
    color: item.color.value,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <ProductContent data={formattedProducts} />
    </div>
  );
}

export default ProductsPage;
