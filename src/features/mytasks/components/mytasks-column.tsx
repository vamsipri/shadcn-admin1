import { ColumnDef } from '@tanstack/react-table';
// import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
// import LongText from '@/components/long-text';
import { DataTableColumnHeader } from './data-table-column';
import  {DataTableRowActions} from './data-table-row-actions';
import { myTasks } from '../data/schema';

export const columns: ColumnDef<myTasks>[] = [
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
  //  {
  //     accessorKey: 'id',
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title='Title' />
  //     ),
  //     cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
  //   cell: ({ row }) => (
  //     <Badge variant='outline' className='capitalize'>
  //       {row.original.status}
  //     </Badge>
  //   ),
  // },
  {
    accessorKey: 'createDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='CreateDate' />,
    cell: ({ row }) => <div>{row.getValue('createDate')}</div>,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='StartDate' />,
    cell: ({ row }) => <div>{row.getValue('startDate')}</div>,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='EndDate' />,
    cell: ({ row }) => <div>{row.getValue('endDate')}</div>,
  },{
    accessorKey: 'actualStartDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ActualStartDate' />,
    cell: ({ row }) => <div>{row.getValue('actualStartDate')}</div>,
  },
  {
    accessorKey: 'actualEndDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ActualEndDate' />,
    cell: ({ row }) => <div>{row.getValue('actualEndDate')}</div>,
  },
  {
    accessorKey: 'planName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='PlanName' />,
    cell: ({ row }) => <div>{row.getValue('planName')}</div>,
  },
  {
    accessorKey: 'phaseName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='PhaseName' />,
    cell: ({ row }) => <div>{row.getValue('phaseName')}</div>,
  },
   {
      id: 'actions', // Remove accessorKey
      accessorKey:"actions",
      header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
   
];

