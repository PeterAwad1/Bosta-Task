import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomPasswordInputProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
};

function CustomPasswordInput({
  fieldName,
  label,
  placeholder,
  className = '',
  disabled = false,
}: CustomPasswordInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { dir } = useTranslations();
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PasswordInput
              dir={dir}
              placeholder={placeholder}
              disabled={isSubmitting || disabled}
              {...field}
              className={cn('h-[53px] rounded-lg px-4 py-4', className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomPasswordInput;
