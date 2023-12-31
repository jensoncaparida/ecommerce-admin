'use client';

import { ModeToggle } from '@/components/darkMode';
import { SubHeading } from '@/components/ui/subHeading';

export const Appearance = () => {
  return (
    <>
      <div className="flex justify-between border p-4 rounded-xl ">
        <div className="space-y-4">
          <SubHeading
            title="Dark Mode"
            description="Adjust the appearance of your store to suit your needs"
          />
          <p className="flex items-center text-muted-foreground text-sm">
            Selecting system mode will adjust your display based on your
            device's system settings.
          </p>
        </div>
        <ModeToggle />
      </div>
    </>
  );
};
