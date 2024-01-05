import prisma from '@/lib/prisma';

import { ColorForm } from './components/colorForm';

export default async function ColorPage({
  params,
}: {
  params: {
    storeId: string;
    colorId: string;
  };
}) {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  return (
    <div className="px-10 py-4">
      <ColorForm initialData={color} />
    </div>
  );
}
