import prisma from '@/lib/prisma';

import { BannerForm } from './components/bannerForm';

export default async function BannerPage({
  params,
}: {
  params: {
    bannerId: string;
  };
}) {
  const banner = await prisma.banner.findUnique({
    where: {
      id: params.bannerId,
    },
  });
  return (
    <div className="px-10 py-4">
      <BannerForm initialData={banner} />
    </div>
  );
}
