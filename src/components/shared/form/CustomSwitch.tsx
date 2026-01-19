import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomSwitchProps = {
  fieldName: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  classNamelabel?: string;
};

const CustomSwitch = ({
  fieldName,
  label,
  description,
  disabled = false,
  className,
  classNamelabel,
}: CustomSwitchProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { dir } = useTranslations();
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={cn('flex flex-row items-center rounded-lg', className)}
        >
          <FormControl>
            <Switch
              dir={dir}
              className={cn(
                'data-[state=checked]:bg-primary-500',
                'data-[state=unchecked]:bg-secondary-400',
              )}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
              disabled={isSubmitting || disabled}
            />
          </FormControl>
          <div className='!mt-0 space-y-0.5'>
            <FormLabel
              className={cn('text-base text-secondary-900', classNamelabel)}
            >
              {label}
            </FormLabel>
            {description && (
              <FormDescription className='ps-4 text-secondary-400'>
                {description}
              </FormDescription>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomSwitch;
