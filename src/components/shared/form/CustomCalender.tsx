import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Matcher } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

type CustomCalenderProps = {
  fieldName: string;
  label: string;
  placeholder: string;
  className?: string;
  disabled?: Matcher | Matcher[] | undefined;
  disabledButton?: boolean;
  optional?: boolean;
};

const CustomCalender = ({
  fieldName,
  label,
  placeholder,
  className,
  disabled = undefined,
  disabledButton = false,
  optional,
}: CustomCalenderProps) => {
  const form = useFormContext();
  const { isSubmitting } = form.formState;
  const { isEnglish } = useLocale();
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel className='mt-1 text-sm'>
            {label}{' '}
            {optional && (
              <span className='text-sm font-normal italic text-neutral-400'>
                {isEnglish ? '(optional)' : '(اختيارى)'}
              </span>
            )}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'h-[53px] rounded-lg border-input px-4 py-4 text-left font-normal hover:bg-transparent hover:text-foreground',
                    field.value ? 'text-foreground' : 'text-muted-foreground',
                  )}
                  disabled={isSubmitting || disabledButton}
                >
                  {field.value ? (
                    <span>
                      {isEnglish
                        ? format(field.value, 'PPP')
                        : format(field.value, 'PPP', { locale: ar })}
                    </span>
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={disabled}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomCalender;
