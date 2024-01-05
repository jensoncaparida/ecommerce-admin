import prisma from '@/lib/prisma';

import { ProductForm } from './components/productForm';

export default async function ProductPage({
  params,
}: {
  params: {
    productId: string;
    storeId: string;
  };
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const brands = await prisma.brand.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="px-10 py-4">
      <ProductForm
        initialData={product}
        categories={categories}
        colors={colors}
        sizes={sizes}
        brands={brands}
      />
    </div>
  );
}
