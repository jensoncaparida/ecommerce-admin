import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

import { SettingsContent } from './components/content';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <main>
      <SettingsContent initialData={store} />
    </main>
  );
}
