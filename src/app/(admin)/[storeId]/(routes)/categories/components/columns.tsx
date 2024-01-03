'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Actions } from './actions';

export type CategoryColumn = {
  id: string;
  name: string;
  bannerLabel: string;
  isParent: boolean;
  relatedEntities: string;
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
    accessorKey: 'isParent',
    header: 'Type',
    cell: ({ row }) => (row.original.isParent ? 'Parent' : 'Sub'),
  },
  {
    accessorKey: 'relatedEntities',
    header: 'Parent Category | Related Entities',
    cell: ({ row }) => row.original.relatedEntities,
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
