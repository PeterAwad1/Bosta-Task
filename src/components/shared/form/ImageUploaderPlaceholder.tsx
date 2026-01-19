import { Upload } from 'lucide-react';

import FilePlaceholder from './FilePlaceholder';

import { cn } from '@/lib/utils';

type ImageUploaderPlaceholderProps = {
  label?: string;
  imageUrl?: string;
  className?: string;
  subLabel?: string;
  classNameImage?: string;
};
const ImageUploaderPlaceholder = ({
  label,
  imageUrl,
  className,
  subLabel,
  classNameImage,
}: ImageUploaderPlaceholderProps) => {
  return (
    <div className={cn('flex flex-col place-items-center', className)}>
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt='svg'
            className={cn(
              'mb-2 size-24 rounded-full object-cover',
              classNameImage,
            )}
          />
          <button
            type='button'
            className='text-red-500 hover:text-red-700'
          >
            Edit
          </button>
        </>
      ) : (
        <div className='w-full rounded-lg outline-dashed outline-1 outline-slate-500'>
          <FilePlaceholder isImages />
        </div>
      )}
      {label && (
        <p className='flex gap-x-2 text-center text-secondary-900'>
          {label} <Upload width={16} />
        </p>
      )}
      <span className='text-secondary-400'>{subLabel}</span>
    </div>
  );
};

export default ImageUploaderPlaceholder;
