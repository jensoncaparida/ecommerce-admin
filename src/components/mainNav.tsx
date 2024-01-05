'use client';

import { useParams, usePathname } from 'next/navigation';

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
    },
    {
      href: `/${params.storeId}/banners`,
      label: 'Banners',
      active: path === `/${params.storeId}/banners` || path.includes('banners'),
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'Categories',
      active:
        path === `/${params.storeId}/categories` || path.includes('categories'),
    },
    {
      href: `/${params.storeId}/brands`,
      label: 'Brands',
      active: path === `/${params.storeId}/brands` || path.includes('brands'),
    },
    {
      href: `/${params.storeId}/settings?tab=general`,
      label: 'Settings',
      active:
        path === `/${params.storeId}/settings` || path.includes('settings'),
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground',
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
}
