import { cn } from '@/lib/utils';

const EmptyCase = ({
  title,
  text,
  image,
  className,
  classNameDiv,
}: {
  title?: string;
  text: string;
  image: string;
  className?: string;
  classNameDiv?: string;
}) => {
  return (
    <div
      className={cn(
        'mb-[77px] mt-14 flex flex-col items-center justify-center gap-4 p-4 text-center text-secondary-400',
        classNameDiv,
      )}
    >
      <img
        src={image}
        className={cn('h-[140px] w-[140px]', className)}
        alt='Flag'
      />
      {title && (
        <p className='mb-2 font-semibold text-secondary-900'>{title}</p>
      )}
      <p>{text}</p>
    </div>
  );
};

export default EmptyCase;
