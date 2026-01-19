import { cn } from '@/lib/utils';

type PageHeadingProps = {
  text: string;
  className?: string;
};
const PageHeading = ({ text, className }: PageHeadingProps) => {
  return (
    <h1
      className={cn(
        'mb-6 text-[24px] font-semibold leading-[42px] tracking-tight text-secondary-900 md:text-[28px] lg:text-[32px]',
        className,
      )}
    >
      {text}
    </h1>
  );
};

export default PageHeading;
