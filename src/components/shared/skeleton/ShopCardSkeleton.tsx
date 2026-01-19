import { Skeleton } from '@/components/ui/skeleton';

const ShopCardSkeleton = () => {
  return (
    <div className='rounded-xl bg-card p-4'>
      <div className='flex items-center justify-between border-b-[1px] border-[#CACCCC] pb-1'>
        <div className='flex items-center gap-2'>
          <Skeleton className='size-10 rounded-full' />

          <div>
            <Skeleton className='mb-2 h-4 w-11' />
            <Skeleton className='h-3 w-14' />
          </div>
        </div>

        <Skeleton className='h-6 w-16 rounded-full' />
      </div>

      <div className='mb-2 mt-4 flex justify-between'>
        <Skeleton className='mb-2 h-4 w-20' />
        <Skeleton className='h-3 w-14' />
      </div>

      <div className='mb-2 mt-4 flex justify-between'>
        <Skeleton className='mb-2 h-4 w-24' />
        <Skeleton className='h-3 w-16' />
      </div>

      <div className='mb-2 mt-4 flex justify-between'>
        <Skeleton className='mb-2 h-4 w-16' />
        <Skeleton className='h-3 w-20' />
      </div>

      <div className='flex items-center justify-between'>
        <Skeleton className='mb-2 h-4 w-28' />
        <Skeleton className='h-3 w-12' />
      </div>
    </div>
  );
};

export default ShopCardSkeleton;
