'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Actions } from './actions';

export type CategoryColumn = {
  id: string;
  name: string;
  bannerLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center space-x-4 hover:text-black dark:hover:text-white"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: 'banner',
    header: 'Banner',
    cell: ({ row }) => row.original.bannerLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
