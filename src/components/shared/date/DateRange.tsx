import React from 'react';

import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import ResetSearchParamsButton from './ResetSearchParamsButton';

import i18n from '@/i18n/config';
import { cn } from '@/lib/utils';

const FilterByDateRange = ({
  fromFieldName,
  toFieldName,
  placeholder,
  className = '',
}: {
  fromFieldName: string;
  toFieldName: string;
  placeholder: string;
  className?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fromValue = searchParams.get(fromFieldName) || '';
  const toValue = searchParams.get(toFieldName) || '';
  const [date, setDate] = React.useState<DateRange | undefined>();
  console.log('🚀 ~ FilterByDateRange ~ date:', date);

  function formatDate(date: Date) {
    const isArabic = i18n.language === 'ar';
    return format(date, 'dd LLL yyyy', { locale: isArabic ? ar : undefined });
  }
  function handleChange(value: DateRange | undefined) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value?.from) {
      newSearchParams.set(fromFieldName, format(value.from, 'yyyy-MM-dd'));
    }
    if (value?.to) {
      newSearchParams.set(toFieldName, format(value.to, 'yyyy-MM-dd'));
    }
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  }

  // ✅ Rename this derived variable
  const selectedDateRange =
    toValue && fromValue
      ? { from: new Date(fromValue), to: new Date(toValue) }
      : undefined;

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn(
              'group h-12 font-normal',
              !selectedDateRange && 'text-primary-500',
            )}
          >
            <CalendarDays className='text-primary-500 group-hover:text-white' />

            {selectedDateRange?.from ? (
              selectedDateRange.to ? (
                <>
                  {formatDate(selectedDateRange.from)} -{' '}
                  {formatDate(selectedDateRange.to)}
                </>
              ) : (
                formatDate(selectedDateRange.from)
              )
            ) : (
              <div>
                <span>{placeholder}</span>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={selectedDateRange?.from}
            selected={selectedDateRange}
            onSelect={(date) => {
              setDate(date);
              handleChange(date);
            }}
          />
          <div className='mb-4 mr-4 flex justify-end sm:hidden'>
            <ResetSearchParamsButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterByDateRange;
