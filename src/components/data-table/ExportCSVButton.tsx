import { DownloadIcon } from 'lucide-react';

import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import useTranslations from '@/i18n/useTranslations';
import { exportTableToCSV } from '@/lib/export';

type ExportCSVButtonProps<TData> = { table: Table<TData>; filename: string };

function ExportCSVButton<TData>({
  table,
  filename,
}: ExportCSVButtonProps<TData>) {
  const { t } = useTranslations('forms.buttonLabels');
  return (
    <Button
      variant='outline'
      size='sm'
      className='flex text-sm text-primary shadow-sm'
      onClick={() =>
        exportTableToCSV(table, {
          filename,
          excludeColumns: ['select', 'actions', 'actionType'],
        })
      }
    >
      <DownloadIcon
        className='size-4'
        aria-hidden='true'
      />
      {t('export')}
    </Button>
  );
}

export default ExportCSVButton;
