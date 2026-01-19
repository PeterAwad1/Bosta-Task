import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import Icon from '../Icon';

import { SelectItem } from '@/types';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomRadioGroupProps = {
  fieldName: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  values: SelectItem[];
};

const CustomRadioGroup = ({
  fieldName,
  label,
  disabled = false,
  className,
  values,
}: CustomRadioGroupProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { dir } = useTranslations();
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex-1 space-y-0'>
          {label && (
            <FormLabel className='mb-2 inline-block p-0'>{label}</FormLabel>
          )}

          <FormControl>
            <RadioGroup
              dir={dir}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('mb-3 flex gap-4', className)}
              disabled={isSubmitting || disabled}
            >
              {values.map(({ value, label, desc, icon }) => (
                <FormItem
                  key={value}
                  className='flex items-center space-y-0'
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <div className='flex flex-col gap-2'>
                    <FormLabel className='flex items-center gap-2 ps-3 font-normal text-secondary-900'>
                      {icon && <Icon name={icon} />}
                      {label}
                    </FormLabel>
                    {desc && (
                      <FormDescription className='flex items-center gap-2 ps-3 font-normal text-secondary-400'>
                        {desc}
                      </FormDescription>
                    )}
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomRadioGroup;
