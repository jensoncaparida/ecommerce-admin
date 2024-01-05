import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import NavBar from '@/components/navBar';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <NavBar />
      <div className="pt-[60px]">{children}</div>
    </>
  );
}
