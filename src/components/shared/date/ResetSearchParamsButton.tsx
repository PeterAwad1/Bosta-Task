import { useSearchParams } from 'react-router-dom';

import useTranslations from '@/i18n/useTranslations';

const ResetSearchParamsButton = () => {
  const [_, setSearchParams] = useSearchParams();
  const { t } = useTranslations();
  return (
    <button
      className='rounded-full text-primary-500 max-sm:bg-primary max-sm:px-4 max-sm:py-1 max-sm:text-white'
      onClick={() => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
      }}
    >
      {t('Reset')}
    </button>
  );
};

export default ResetSearchParamsButton;
