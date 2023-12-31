'use client';

import { Store } from '@prisma/client';

import { Heading } from '@/components/ui/heading';
import { NavTab } from '@/components/ui/navTab';

import { GeneralTab } from './generalTab';
import { Separator } from '@/components/ui/separator';
import { DangerZoneTab } from './dangerZoneTab';
import { Appearance } from './appearance';

interface SettingsContentProps {
  initialData: Store;
}

export const SettingsContent = ({ initialData }: SettingsContentProps) => {
  const tabs = [
    {
      label: 'General',
      value: 'general',
      content: <GeneralTab initialData={initialData} />,
    },
    {
      label: 'Appearance',
      value: 'appearance',
      content: <Appearance />,
    },
    {
      label: 'Danger Zone',
      value: 'danger',
      content: <DangerZoneTab />,
    },
  ];

  return (
    <>
      <div className="px-10 py-4 space-y-4">
        <Heading
          title="Settings"
          description="Configure settings for your store"
        />
        <Separator />
        <NavTab tabs={tabs} />
      </div>
    </>
  );
};
