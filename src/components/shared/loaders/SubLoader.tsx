import LOADER from '@/assets/gif/loader.gif';
import { cn } from '@/lib/utils';

const SubLoader = ({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className='flex w-full items-center justify-center text-center'>
      <img
        src={LOADER}
        alt='Loading...'
        width={size || 300}
        height={size || 300}
        className={cn('max-xs:size-56', className)}
        style={{
          filter:
            'brightness(0) saturate(100%) invert(48%) sepia(42%) saturate(1196%) hue-rotate(335deg) brightness(91%) contrast(102%)',
        }}
      />
    </div>
  );
};

export default SubLoader;
