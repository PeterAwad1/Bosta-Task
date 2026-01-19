import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import Spinner from './loaders/Spinner';

import { cn } from '@/lib/utils';

const SubmitButton = ({
  text,
  disabled = false,
  className = '',
}: {
  text: string;
  disabled?: boolean;
  className?: string;
}) => {
  const form = useFormContext();
  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Button
      disabled={disabled || isSubmitting}
      type='submit'
      className={cn(
        'mb-1 w-36 sm:col-span-2',
        // !isValid &&
        //   'bg-secondary-100 text-secondary-300 hover:bg-secondary-100 disabled:opacity-100',
        className,
      )}
    >
      {isSubmitting ? <Spinner /> : text}
    </Button>
  );
};

export default SubmitButton;
