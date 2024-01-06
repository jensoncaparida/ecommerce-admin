'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Actions } from './actions';

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  size: string;
  color: string;
  stock: number;
  discount: number;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.original.description.length > 10
          ? `${row.original.description.substring(0, 10)}...`
          : row.original.description}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'discount',
    header: 'Discount',
    cell: ({ row }) => <div className="text-sm">{row.original.discount}%</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-4">
        <div
          className="rounded border p-2 px-5"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date Created',
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.original.createdAt}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <Actions data={row.original} />,
  },
];
