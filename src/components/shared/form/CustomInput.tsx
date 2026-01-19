import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

type CustomInputProps = {
  fieldName: string;
  label?: string;
  subLable?: string;
  placeholder: string;
  type?: string;
  className?: string;
  formItemClassName?: string;
  disabled?: boolean;
  isNumberAsAString?: boolean;
  optional?: boolean;
  hint?: string;
};

function CustomInput({
  fieldName,
  optional,
  label,
  subLable,
  placeholder,
  type = 'text',
  className = '',
  formItemClassName = '',
  disabled = false,
  isNumberAsAString = false,
  hint,
}: CustomInputProps) {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { isEnglish } = useLocale();

  const { clearErrors } = form;

  // Prevent wheel scroll on number inputs
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if ((event.target as HTMLInputElement).type === 'number') {
        event.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={formItemClassName}>
          {label && (
            <FormLabel className='text-start text-sm'>
              {label}{' '}
              {optional && (
                <span className='text-sm font-normal italic text-neutral-400'>
                  {isEnglish ? '(optional)' : '(اختيارى)'}
                </span>
              )}
              {subLable && (
                <span className='text-xs font-normal text-neutral-400'>
                  {subLable}
                </span>
              )}
            </FormLabel>
          )}

          <FormControl>
            <div className='flex flex-col'>
              <Input
                placeholder={placeholder}
                type={type}
                disabled={isSubmitting || disabled}
                className={cn('h-[53px] rounded-lg p-4', className)}
                {...field}
                onChange={(event) => {
                  const value = event.target.value;

                  // ✅ Clear manual error as soon as user types
                  clearErrors(fieldName);

                  if (type === 'number') {
                    field.onChange(value === '' ? NaN : Number(value));
                    return;
                  }

                  if (isNumberAsAString && !/^\d*$/.test(value)) return;

                  field.onChange(value);
                }}
              />

              {hint && (
                <p className='ml-4 mt-1 text-xs text-primary-500 rtl:mr-4'>
                  {hint}
                </p>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomInput;
