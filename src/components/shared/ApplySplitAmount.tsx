import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Button } from '../ui/button';

import Icon from './Icon';

import useTranslations from '@/i18n/useTranslations';
import { cn } from '@/lib/utils';

const ApplySplitAmount = () => {
  const { control, getValues, setValue, trigger } = useFormContext();
  const { t } = useTranslations();

  const [remainingBalance, setRemainingBalance] = useState(0);
  return (
    <>
      <div className='flex'>
        <FormField
          control={control}
          name='splitAmount'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-sm'>{t('1st payment')}/</FormLabel>
              <div className='flex'>
                <FormControl>
                  <Input
                    placeholder='Enter the amount to be paid today.'
                    type='number'
                    className={cn('h-[53px] rounded-lg rounded-r-none p-4')}
                    {...field}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      field.onChange(+inputValue);
                      return;
                    }}
                    max={450}
                  />
                </FormControl>

                <Button
                  className='mt-auto h-[53px] rounded-l-none px-7'
                  type='button'
                  onClick={() => {
                    trigger('splitAmount');
                    const splitAmount = getValues('splitAmount');

                    if (
                      splitAmount === undefined ||
                      splitAmount === 0 ||
                      splitAmount > 450
                    ) {
                      setRemainingBalance(0);
                      return;
                    }
                    setRemainingBalance(450 - splitAmount);
                  }}
                >
                  {t('Apply')}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {remainingBalance !== 0 && (
        <div>
          <p className='my-4 text-lg font-semibold'>
            {t('Remaining Balance')}{' '}
            <span className='text-error-500'>
              {remainingBalance} {t('EGP')}
            </span>
          </p>

          <div className='flex items-end justify-between'>
            <div>
              <p className='text-secondary-900'></p>
              <p className='text-sm text-secondary-400'>
                {t('Paid on 28/10/2024')}
              </p>
            </div>

            <div className='flex gap-x-4'>
              <span className='text-lg font-semibold text-success-500'>
                {450 - remainingBalance} {t('EGP')}
              </span>
              <button
                type='button'
                onClick={() => {
                  setRemainingBalance(0);
                  setValue('splitAmount', 0);
                }}
              >
                <Icon name='trash' />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplySplitAmount;
