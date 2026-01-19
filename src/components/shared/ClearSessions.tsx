import { useFormContext } from 'react-hook-form';

import { Button } from '../ui/button';

import useTranslations from '@/i18n/useTranslations';

const ClearSessions = ({ fieldName }: { fieldName?: string }) => {
  const { setValue } = useFormContext();
  const { t } = useTranslations();
  function clearSessions() {
    setValue(`${fieldName || 'sessions'}`, []);
  }
  return (
    <Button
      type='button'
      onClick={clearSessions}
    >
      {t('Clear Session')}
    </Button>
  );
};

export default ClearSessions;
