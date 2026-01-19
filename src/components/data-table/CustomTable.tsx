import { useTranslation } from 'react-i18next';

import { flexRender, type Table as TableType } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Localized from '@/i18n/Localized';
import { cn } from '@/lib/utils';

type CustomTableProps<TData> = {
  table: TableType<TData>;
  columnsLength: number;
  className?: string;
};

function CustomTable<TData>({
  table,
  columnsLength,
  className = '',
}: CustomTableProps<TData>) {
  const { t } = useTranslation();
  return (
    <Table
      className={cn(
        '[&_th]:text-secondary-400 rtl:[&_th]:text-right',
        className,
      )}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className='max-w-80 truncate px-8'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columnsLength}
              className='h-24 text-center'
            >
              <Localized text={t('No Results')} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default CustomTable;
