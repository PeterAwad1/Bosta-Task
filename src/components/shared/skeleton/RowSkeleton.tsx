import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

const RowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <div className='flex items-center gap-2'>
          <Skeleton className='aspect-square w-10 rounded-full' />

          <div>
            <Skeleton className='mb-1 h-3 w-11' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Skeleton className='h-4 w-16' />
      </TableCell>

      <TableCell>
        <Skeleton className='h-4 w-20' />
      </TableCell>

      <TableCell>
        <Skeleton className='h-9 w-20 rounded-full' />
      </TableCell>

      <TableCell>
        <Skeleton className='h-4 w-24' />
      </TableCell>

      <TableCell>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='size-5' />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default RowSkeleton;
