import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectItem as SelectItemType } from '@/types';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomSelectProps = {
  fieldName: string;
  label: string;
  items: SelectItemType[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const CustomSelect = ({
  fieldName,
  label,
  placeholder,
  className,
  items,
  disabled,
}: CustomSelectProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { dir } = useTranslations();
  const { isEnglish } = useLocale();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>

          <Select
            dir={dir}
            onValueChange={field.onChange}
            value={field.value}
            disabled={isSubmitting || disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  'h-[53px] rounded-lg px-4 py-4',
                  !field.value && 'text-muted-foreground',
                  className,
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {items?.map(({ labelEn, labelAr, label, value, className }) => {
                const displayLabel =
                  (isEnglish ? labelEn : labelAr) ?? label ?? '';
                return (
                  <SelectItem
                    key={value}
                    value={value}
                    className={cn('cursor-pointer', className)}
                  >
                    {displayLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
