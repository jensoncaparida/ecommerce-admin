import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { SizeColumn } from './components/columns';
import { SizeContent } from './components/content';

async function SizesPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <SizeContent data={formattedSizes} />
    </div>
  );
}

export default SizesPage;
