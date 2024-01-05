import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/mainNav';
import prisma from '@/lib/prisma';
import StoreSwitcher from '@/components/storeSwitcher';

const NavBar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="fixed z-10 flex h-[60px] w-full flex-row items-center justify-between border-b bg-white px-10 shadow-sm dark:bg-gray-950">
      <div className="item-center flex space-x-4">
        <StoreSwitcher items={stores} />
        <MainNav />
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBar;
