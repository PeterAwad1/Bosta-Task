import { Skeleton } from '@/components/ui/skeleton';
import { TableHead } from '@/components/ui/table';

const HeadSkeleton = () => {
  return (
    <TableHead>
      <Skeleton className='h-6 w-24' />
    </TableHead>
  );
};

export default HeadSkeleton;
