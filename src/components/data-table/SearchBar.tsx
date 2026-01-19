import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';

import Icon from '../shared/Icon';

import { cn } from '@/lib/utils';

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
};

const SearchBar = ({
  placeholder = '',
  className = '',
  containerClassName = '',
}: SearchBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('searchValue') || '',
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to update URL search params
  const updateSearchParams = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();
      const newSearchParams = new URLSearchParams(searchParams);

      if (trimmedValue) {
        newSearchParams.set('searchValue', trimmedValue);
      } else {
        newSearchParams.delete('searchValue');
      }

      newSearchParams.set('pageNumber', '1');
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Sync with URL params
  useEffect(() => {
    const currentParam = searchParams.get('searchValue') || '';
    if (currentParam !== searchValue) {
      setSearchValue(currentParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    // Prevent whitespace at the beginning
    if (value.startsWith(' ')) {
      return;
    }

    setSearchValue(value);

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for 200ms
    timeoutRef.current = setTimeout(() => {
      updateSearchParams(value);
    }, 500);
  }

  // Handle immediate submission on blur (optional)
  const handleBlur = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    updateSearchParams(searchValue);
  }, [searchValue, updateSearchParams]);

  return (
    <div className={cn('relative max-sm:w-full', containerClassName)}>
      <Input
        type='text'
        placeholder={placeholder}
        className={cn(
          'h-12 w-full rounded-full border border-secondary-100 bg-card px-10 py-3 placeholder:text-secondary-300 md:w-[360px] lg:w-96 rtl:leading-[4]',
          className,
        )}
        value={searchValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div className='absolute left-4 top-1/2 -translate-y-1/2 text-secondary-300'>
        <Icon
          name='search'
          className='size-4'
          fill='#88807C'
        />
      </div>
    </div>
  );
};

export default SearchBar;
