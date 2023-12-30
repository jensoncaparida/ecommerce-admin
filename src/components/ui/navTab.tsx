'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';

interface NavTabProps {
  tabs: {
    label: string;
    value: string;
    content: React.ReactNode;
  }[];
}

export const NavTab = ({ tabs }: NavTabProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabClick = (tab: string) => {
    router.push(`?tab=${tab}`);
  };

  const tab = searchParams.get('tab');
  const defaultValue = tabs.find((tabItem) => tabItem.value === tab)?.value;

  return (
    <>
      <div>
        <Tabs defaultValue={defaultValue}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                onClick={() => handleTabClick(tab.value)}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-8">
            {tabs.map((tab) => (
              <TabsContent key={tab.label} value={tab.value}>
                {tab.content}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
};
