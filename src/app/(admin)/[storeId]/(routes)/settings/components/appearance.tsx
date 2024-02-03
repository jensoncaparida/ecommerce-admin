'use client';

import { ModeToggle } from '@/components/darkMode';
import { SubHeading } from '@/components/ui/subHeading';

export const Appearance = () => {
  return (
    <>
      <div className="flex justify-between rounded-xl border p-4 ">
        <div className="space-y-4">
          <SubHeading
            title="Dark Mode"
            description="Adjust the appearance of your store to suit your needs"
          />
          <p className="flex items-center text-sm text-muted-foreground">
            Selecting system mode will adjust your display based on your
            device&apos;s system settings.
          </p>
        </div>
        <ModeToggle />
      </div>
    </>
  );
};
