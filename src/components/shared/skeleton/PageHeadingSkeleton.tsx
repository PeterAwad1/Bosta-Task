import { Skeleton } from '@/components/ui/skeleton';

const PageHeadingSkeleton = () => {
  return (
    <section>
      <div className='mb-8 flex items-start gap-x-4'>
        <Skeleton className='min-h-16 min-w-16' />

        <div>
          <Skeleton className='mb-2 h-8 w-48 md:w-[500px]' />
          <Skeleton className='h-6 w-48 md:w-[500px]' />
        </div>
      </div>
    </section>
  );
};

export default PageHeadingSkeleton;
