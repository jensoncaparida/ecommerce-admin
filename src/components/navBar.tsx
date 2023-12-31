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
    <div className="w-full h-[60px] border-b shadow-sm flex flex-row items-center justify-between px-10 ">
      <StoreSwitcher items={stores} />
      <MainNav />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavBar;
