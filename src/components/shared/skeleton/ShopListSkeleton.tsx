import { Skeleton } from '@/components/ui/skeleton';

import ShopCardSkeleton from './ShopCardSkeleton';

const ShopListSkeleton = () => {
  return (
    <section className='max-sm:pb-40'>
      <div className='mt-8 max-md:pb-4'>
        <div className='relative'>
          <Skeleton className='w-full h-12' />
        </div>
      </div>

      <div className='grid gap-4'>
        <ShopCardSkeleton />
        <ShopCardSkeleton />
        <ShopCardSkeleton />
        <ShopCardSkeleton />
      </div>

      <div className='fixed bottom-[72px] left-0 w-full border-t bg-card p-4 flex flex-col gap-2'>
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-12 w-full' />
      </div>
    </section>
  );
};

export default ShopListSkeleton;
