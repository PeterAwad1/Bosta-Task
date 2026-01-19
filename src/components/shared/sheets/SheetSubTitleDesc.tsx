import { SheetDescription } from '@/components/ui/sheet';

import { cn } from '@/lib/utils';

type SheetSubTitleDescProps = {
  title: string;
  className?: string;
};

const SheetSubTitleDesc = ({ title, className }: SheetSubTitleDescProps) => {
  return (
    <SheetDescription className={cn('mb-8 text-secondary-400', className)}>
      {title}
    </SheetDescription>
  );
};

export default SheetSubTitleDesc;
