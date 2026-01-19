import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import Spinner from '../loaders/Spinner';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
  label?: string;
  className?: string;
};

const SubmitButton = ({ label, className }: SubmitButtonProps) => {
  const { t } = useTranslations('forms.buttonLabels');
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button
      type='submit'
      className={cn('w-full', className)}
    >
      {isSubmitting ? <Spinner /> : label || t('submit')}
    </Button>
  );
};

export default SubmitButton;
