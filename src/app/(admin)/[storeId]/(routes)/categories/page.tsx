import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { CategoryColumn } from './components/columns';
import { CategoryContent } from './components/content';

async function CategoriesPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      banner: true,
      parent: true,
      children: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    bannerLabel: item.banner ? item.banner.label : '-',
    isParent: item.isParent,
    relatedEntities: item.parent
      ? item.parent.name
      : item.children.map((child: any) => child.name).join(', '),
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <CategoryContent data={formattedCategories} />
    </div>
  );
}

export default CategoriesPage;
