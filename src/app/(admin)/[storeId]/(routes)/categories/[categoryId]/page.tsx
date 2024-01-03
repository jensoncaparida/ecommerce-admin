import prisma from '@/lib/prisma';

import { CategoryForm } from './components/categoryForm';

export default async function CategoryPage({
  params,
}: {
  params: {
    storeId: string;
    categoryId: string;
  };
}) {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const banners = await prisma.banner.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
      isParent: true,
    },
  });

  return (
    <div className="px-10 py-4">
      <CategoryForm
        initialData={category}
        bannersData={banners}
        categoriesData={categories}
      />
    </div>
  );
}
