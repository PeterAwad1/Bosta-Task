import { useState } from 'react';

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

//import { useGlobalContext } from '@/context/GlobalContext';
import useLocale from '@/i18n/useLocale';

function useDataTable<TData, TValue>(
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
) {
  // const { isDefaultAdmin } = useGlobalContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { isEnglish } = useLocale();

  const table = useReactTable({
    data,
    columns,
    columnResizeDirection: isEnglish ? 'ltr' : 'rtl',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility: {
        ...columnVisibility,
      },
      rowSelection,
    },
    // autoResetpageNumber: false,
  });

  return table;
}

export default useDataTable;
