'use client';

import { useParams, usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, Folders } from 'lucide-react';

import { cn } from '@/lib/utils';
import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const path = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      active: path === `/${params.storeId}`,
      icon: LayoutDashboard,
    },
    {
      href: `/${params.storeId}/banners`,
      label: 'Banners',
      active: path === `/${params.storeId}/banners` || path.includes('banners'),
      icon: Folders,
    },
    {
      href: `/${params.storeId}/settings?tab=general`,
      label: 'Settings',
      active:
        path === `/${params.storeId}/settings` || path.includes('settings'),
      icon: Settings,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => {
        const IconComponent = route.icon;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'flex items-center gap-2 font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground'
            )}
          >
            <IconComponent className="w-5 h-5" />
            <span className="lg:flex hidden">{route.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
