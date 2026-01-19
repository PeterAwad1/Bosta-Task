import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import ResetSearchParamsButton from './ResetSearchParamsButton';

import { cn } from '@/lib/utils';

// ✅ Helper to safely parse "dd-MM-yyyy" into a valid JS Date
function parseCustomDate(dateStr: string): Date | undefined {
  if (!dateStr) return undefined;
  const [day, month, year] = dateStr.split('-');
  if (!day || !month || !year) return undefined;
  const parsed = new Date(`${year}-${month}-${day}`); // ISO format
  return isNaN(parsed.getTime()) ? undefined : parsed;
}

const FilterByDate = ({
  dateFieldName,
  placeholder,
  className = '',
}: {
  dateFieldName: string;
  placeholder: string;
  className?: string;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateValue = searchParams.get(dateFieldName) || '';

  function handleChange(value: Date | undefined) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      // ✅ Always store in "dd-MM-yyyy" format
      newSearchParams.set(dateFieldName, format(value, 'dd-MM-yyyy'));
    } else {
      newSearchParams.delete(dateFieldName);
    }
    newSearchParams.set('pageIndex', '1');
    setSearchParams(newSearchParams);
  }

  // ✅ Safely parse stored date string
  const selectedDate = parseCustomDate(dateValue);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant='outline'
            className={cn(
              'group h-12 font-normal',
              !selectedDate && 'text-primary-500',
            )}
          >
            <CalendarDays className='text-primary-500 group-hover:text-white' />
            {selectedDate ? (
              format(selectedDate, 'LLL dd, y')
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
            mode='single'
            defaultMonth={selectedDate}
            selected={selectedDate}
            onSelect={handleChange}
          />
          <div className='mr-4 flex justify-end sm:hidden'>
            <ResetSearchParamsButton />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterByDate;
