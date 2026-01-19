//import { DownloadIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

const CustomExportCSVButton = ({
  headers,
  data = [],
  fileName = '',
  className,
}: any) => {
  const { t } = useTranslations();

  const handleDownloadReports = () => {
    const csvRows = [headers.join(','), ...data];
    const csvContent = `\uFEFF${csvRows.join('\n')}`;
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Button
      variant='outline'
      className={cn(
        'flex text-sm text-primary shadow-sm hover:bg-white hover:text-primary-400',
        className,
      )}
      onClick={handleDownloadReports}
    >
      {t('Download Template')}
    </Button>
  );
};

export default CustomExportCSVButton;
