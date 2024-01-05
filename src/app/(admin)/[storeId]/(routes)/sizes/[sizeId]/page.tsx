import prisma from '@/lib/prisma';

import { SizeForm } from './components/sizeForm';

export default async function SizePage({
  params,
}: {
  params: {
    storeId: string;
    sizeId: string;
  };
}) {
  const size = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="px-10 py-4">
      <SizeForm initialData={size} />
    </div>
  );
}
