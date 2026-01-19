import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';

import HeadSkeleton from './HeadSkeleton';
import RowSkeleton from './RowSkeleton';

const TableSkeleton = () => {
  return (
    <section className='mt-8 max-md:pb-16'>
      <div className='rounded-lg border-[1px] border-[#CACCCC] bg-card p-4 py-3'>
        <div className='flex gap-2 max-sm:flex-col max-sm:flex-wrap sm:items-center'>
          <Skeleton className='h-12 w-[380px]' />

          <div className='hidden sm:flex'>
            <Skeleton className='h-12 w-24' />
          </div>

          <Skeleton className='h-4 w-24' />

          <div className='ml-auto hidden flex-wrap gap-4 sm:flex'>
            <Skeleton className='h-8 w-20' />
          </div>
        </div>

        <div className='mt-8'>
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <HeadSkeleton />
                  <HeadSkeleton />
                  <HeadSkeleton />
                  <HeadSkeleton />
                  <HeadSkeleton />
                  <HeadSkeleton />
                </TableRow>
              </TableHeader>

              <TableBody>
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
                <RowSkeleton />
              </TableBody>
            </Table>
          </div>

          <div className='flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between'>
            <Skeleton className='h-5 w-36' />
            <Skeleton className='h-7 w-44' />

            <div>
              <Skeleton className='h-8 w-44' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSkeleton;
