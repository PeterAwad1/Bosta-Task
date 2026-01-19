'use client';

import { useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SelectItem as SelectItemType } from '@/types';

import useLocale from '@/i18n/useLocale';
import { cn } from '@/lib/utils';

type CustomSelectorFilterProps = {
  label?: string;
  items: SelectItemType[];
  placeholder: string;
  fildName: string;
  disabled?: boolean;
  className?: string;
  isSearch?: boolean;
};

const CustomSelectorFilter = ({
  label,
  placeholder,
  className,
  items,
  disabled,
  fildName,
  isSearch = false,
}: CustomSelectorFilterProps) => {
  const [search, setSearch] = useState('');
  const { isEnglish } = useLocale();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // current selected value from URL
  const selectedValue = searchParams.get(fildName) ?? '';

  // filter items by EN or AR based on search
  const filteredItems = useMemo(() => {
    return items?.filter((i) =>
      (isEnglish ? i.labelEn : i.labelAr)
        ?.toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search, items, isEnglish]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(fildName, value);
    } else {
      params.delete(fildName);
    }
    navigate(`?${params.toString()}`, { replace: true });
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className='text-sm font-semibold text-neutral-900'>
          {label}
        </label>
      )}

      <Select
        onValueChange={handleChange}
        value={selectedValue}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            'h-[53px] rounded-lg border-primary-100 bg-white px-4 py-4 font-inter font-normal hover:bg-primary-500 hover:text-white',
            selectedValue ? 'text-primary' : 'text-primary',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {/* search input */}
          {isSearch && (
            <div className='p-2'>
              <Input
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='h-8'
              />
            </div>
          )}

          {filteredItems?.length > 0 ? (
            filteredItems.map(({ labelEn, labelAr, value }) => (
              <SelectItem
                key={value}
                value={value}
                className='cursor-pointer'
              >
                {isEnglish ? labelEn : labelAr}
              </SelectItem>
            ))
          ) : (
            <div className='px-2 py-1 text-sm text-neutral-500'>
              No results found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelectorFilter;
