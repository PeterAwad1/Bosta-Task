import useTableSearchParams from '@/hooks/useTableSearchParams';

import useTranslations from '@/i18n/useTranslations';

type TableStatisticsProps = {
  totalCount?: number;
};

function TableStatistics({ totalCount }: TableStatisticsProps) {
  const { pageNumber, pageSize } = useTableSearchParams();
  const { t } = useTranslations();

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount || 0);

  return (
    <p className='text-sm text-muted-foreground'>
      {t('showing', { start, end, total: totalCount || 0 })}
    </p>
  );
}

export default TableStatistics;
