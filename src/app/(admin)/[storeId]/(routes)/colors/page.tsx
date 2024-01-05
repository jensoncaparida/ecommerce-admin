import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { ColorColumn } from './components/columns';
import { ColorContent } from './components/content';

async function ColorsPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <ColorContent data={formattedColors} />
    </div>
  );
}

export default ColorsPage;
