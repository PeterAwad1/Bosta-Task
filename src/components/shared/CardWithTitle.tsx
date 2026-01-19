import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type CardWithTitleProps = {
  title: string;
  titleClassName?: string;
  className?: string;
  children: ReactNode;
  desc?: string;
  classNameTitle?: string;
  classNameDesc?: string;
};

const CardWithTitle = ({
  title,
  className,
  children,
  desc,
  classNameDesc,
  titleClassName,
  classNameTitle,
}: CardWithTitleProps) => {
  return (
    <div
      className={cn('mt-4 rounded-lg border border-secondary-50', className)}
    >
      <div
        className={cn(
          'flex flex-col gap-2 border-b border-secondary-50 p-4',
          classNameTitle,
        )}
      >
        <h3
          className={cn(
            'text-lg font-semibold text-secondary-900',
            titleClassName,
          )}
        >
          {title}
        </h3>
        {desc && (
          <p className={cn('text-secondary-400', classNameDesc)}>{desc}</p>
        )}
      </div>

      <div className='p-4'>{children}</div>
    </div>
  );
};

export default CardWithTitle;
