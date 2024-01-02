import { format } from 'date-fns';

import prisma from '@/lib/prisma';
import { BannerColumn } from './components/columns';
import { BannerContent } from './components/content';

async function BannersPage({
  params,
}: {
  params: {
    storeId: string;
  };
}) {
  const banners = await prisma.banner.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBanners: BannerColumn[] = banners.map((item) => ({
    id: item.id,
    label: item.label,
    imageUrl: item.imageUrl,
    createdAt: format(item.createdAt, 'MMMM do, yyyy | hh:mm a'),
  }));

  return (
    <div className="px-10 py-4">
      <BannerContent data={formattedBanners} />
    </div>
  );
}

export default BannersPage;
