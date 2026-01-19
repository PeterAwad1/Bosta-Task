import Icon from '@/components/shared/Icon';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import useTranslations from '@/i18n/useTranslations';

const RemoveCardSheet = () => {
  const { t } = useTranslations();
  return (
    <Sheet>
      <SheetTrigger>
        <Button className='bg-error-500'>{t('Remove Court')}</Button>
      </SheetTrigger>
      <SheetContent className='flex flex-col justify-between gap-4 px-6 pb-0 sm:max-w-[603px]'>
        <div className='px-6'>
          <SheetTitle className='mb-6 font-Sora text-[28px] font-semibold max-sm:text-[24px]'>
            {t('Remove Court')}
          </SheetTitle>
          <p className='mb-4 p-4 font-Sora text-2xl font-semibold text-secondary-900'>
            {t(' Court Alpha')}
          </p>
          <div className='mb-2 flex gap-2'>
            <Icon name='alart' />
            <p className='text-[18px] font-semibold text-error-500'>
              {t('You are about to remove this Court from the system')}
            </p>
          </div>
          <p className='text-secondary-400'>
            &bull;{' '}
            {t(
              'This Court will no longer be available for new Training sessions',
            )}
          </p>
        </div>

        <div
          className='flex gap-4 rounded-lg px-6 py-4 shadow-lg'
          style={{ boxShadow: '0px -4px 8px 0px #0000001A' }}
        >
          <Button
            variant={'outline'}
            className='flex-1 hover:bg-transparent hover:text-primary-500'
          >
            {t('Cancel')}
          </Button>
          <Button className='flex-1 bg-error-500 text-secondary-50 hover:bg-error-700'>
            {t('Remove Court')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RemoveCardSheet;
