import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { countriesAr, countriesEn } from '@/i18n/localizedCountry';
import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomPhoneInputProps = {
  fieldName: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  optional?: boolean;
};

const CustomPhoneInput = ({
  fieldName,
  disabled = false,
  label,
  placeholder = '',
  className,
  optional,
}: CustomPhoneInputProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { dir, t } = useTranslations();
  const { isEnglish } = useLocale();
  const isRTL = dir === 'rtl';

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex w-full flex-col gap-2')}>
          <FormLabel
            className={cn('flex gap-2 text-sm', isRTL && 'text-right')}
            dir={dir}
          >
            {label}
            {optional && (
              <span className='text-sm font-normal italic text-neutral-400'>
                {t('shared.optionalLabel')}
              </span>
            )}
          </FormLabel>
          <FormControl
            className='w-full'
            dir={dir}
          >
            <PhoneInput
              placeholder={placeholder}
              {...field}
              defaultCountry='EG'
              disabled={isSubmitting || disabled}
              className={cn(className)}
              options={isEnglish ? countriesEn : countriesAr}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomPhoneInput;
