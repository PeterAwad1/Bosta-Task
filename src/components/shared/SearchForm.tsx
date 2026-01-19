import { useState } from 'react';

import { Input } from '../ui/input';

import Icon from './Icon';

const SearchForm = ({ placeholder }: { placeholder: string }) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className='relative flex-1'>
      <Input
        type='text'
        placeholder={placeholder}
        className='h-12 w-full rounded-lg border border-secondary-100 bg-card px-10 py-3 placeholder:text-secondary-300 rtl:leading-[4]'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
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

export default SearchForm;
