'use client';

import { useState } from 'react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [active, setActive] = useState('system');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {active === 'dark' ? (
            <span>Dark</span>
          ) : active === 'light' ? (
            <span>Light</span>
          ) : (
            <span>System</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Dark Mode */}
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            setTheme('dark');
            setActive('dark');
          }}
        >
          <span>Dark</span>
          {active === 'dark' && <Check className="h-4 w-4 text-green-500" />}
        </DropdownMenuItem>
        {/* Light Mode */}
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            setTheme('light');
            setActive('light');
          }}
        >
          <span>Light</span>
          {active === 'light' && <Check className="h-4 w-4 text-green-500" />}
        </DropdownMenuItem>
        {/* System Mode */}
        <DropdownMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            setTheme('system');
            setActive('system');
          }}
        >
          <span>System</span>
          {active === 'system' && <Check className="h-4 w-4 text-green-500" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
