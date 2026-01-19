import * as XLSX from 'xlsx';

import { Button } from '@/components/ui/button';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

const CustomExportXLSXButton = ({
  headers,
  data = [],
  fileName = '',
  className,
  buttonName,
  variant = 'outline',
}: any) => {
  const { t } = useTranslations();

  const handleDownloadReports = () => {
    // Combine headers and data into a worksheet format
    const worksheetData = [headers, ...data];
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Create XLSX file and trigger download
    XLSX.writeFile(workbook, `${fileName || 'download'}.xlsx`);
  };

  return (
    <Button
      variant={variant}
      className={cn(
        'flex text-sm text-primary shadow-sm hover:bg-white hover:text-primary-400',
        className,
      )}
      onClick={handleDownloadReports}
    >
      {buttonName || t('Download Template')}
    </Button>
  );
};

export default CustomExportXLSXButton;
