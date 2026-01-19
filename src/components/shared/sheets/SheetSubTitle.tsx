import { SheetTitle } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

type SheetSubTitleProps = {
  title: string;
  className?: string;
  optional?: boolean;
};
const SheetSubTitle = ({
  title,
  className,
  optional = false,
}: SheetSubTitleProps) => {
  return (
    <SheetTitle
      className={cn(
        'mb-2 mt-4 text-lg font-semibold text-secondary-900 max-sm:text-[24px]',
        className,
      )}
    >
      {title}{' '}
      {optional && (
        <span className='text-lg font-semibold italic text-secondary-400'>
          (Optional)
        </span>
      )}
    </SheetTitle>
  );
};

export default SheetSubTitle;
