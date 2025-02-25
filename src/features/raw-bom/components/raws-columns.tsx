import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LongText from '@/components/long-text';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { Raw } from '../data/schema';

export const columns: ColumnDef<Raw>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => (
      <Badge variant='outline' className='capitalize'>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date' />,
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'rawBomFileName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Raw BOM File Name' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue('rawBomFileName')}</LongText>,
  },
  {
    accessorKey: 'path',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Path' />,
    cell: ({ row }) => <LongText className='max-w-36'>{row.getValue('path')}</LongText>,
  },
  {
    id: 'actions', // Remove accessorKey
    accessorKey:"actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

