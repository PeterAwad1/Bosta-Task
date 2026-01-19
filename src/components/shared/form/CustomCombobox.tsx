import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { SelectItem as SelectItemType } from '@/types';

import useLocale from '@/i18n/useLocale';
import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

type CustomComboboxProps = {
  fieldName: string;
  label: string;
  items: SelectItemType[];
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const CustomCombobox = ({
  fieldName,
  label,
  placeholder,
  className,
  items,
  disabled,
}: CustomComboboxProps) => {
  const [open, setOpen] = useState(false);
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { t } = useTranslations();
  const { isEnglish } = useLocale();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={`mt-[10px] flex flex-col ${className}`}>
          <FormLabel>{label}</FormLabel>

          <Popover
            open={open}
            onOpenChange={setOpen}
            modal={true}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  disabled={isSubmitting || disabled}
                  className={cn(
                    'flex h-[54px] items-center justify-between gap-2 rounded-lg border-input font-normal hover:bg-transparent hover:text-neutral-800',
                    field.value
                      ? 'text-neutral-800 hover:font-medium'
                      : 'text-neutral-400',
                  )}
                >
                  <div className='flex items-center gap-2'>
                    <span>
                      {field.value
                        ? items.find(({ value }) => value === field.value)
                            ?.label ||
                          (isEnglish
                            ? items.find(({ value }) => value === field.value)
                                ?.labelEn
                            : items.find(({ value }) => value === field.value)
                                ?.labelAr)
                        : placeholder}
                    </span>
                  </div>

                  <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='ComboboxPopoverContent p-0'>
              <Command>
                <CommandInput
                  className='ms-2'
                  placeholder={t('property.form.search') || 'Search...'}
                />
                <CommandList>
                  <CommandEmpty>
                    {t('property.form.notFound') || 'Not Found...'}
                  </CommandEmpty>
                  <CommandGroup>
                    {items.map(({ label, labelEn, labelAr, value }) => (
                      <CommandItem
                        value={value}
                        key={value}
                        className='flex justify-between'
                        onSelect={() => {
                          form.setValue(fieldName, value, {
                            shouldValidate: true,
                            shouldTouch: true,
                          });
                          setOpen(false);
                        }}
                      >
                        <span className='flex-1'>
                          {label || (isEnglish ? labelEn : labelAr)}
                        </span>
                        <Check
                          size={18}
                          className={cn(
                            'ml-auto',
                            value === field.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCombobox;
