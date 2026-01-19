import Icon from '@/components/shared/Icon';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type SheetHeadingProps = {
  iconName: string;
  headingTitle: string;
  headingDescription: string;
  hasIssues?: boolean;
  issuesDescription?: string;
};
const SheetHeading = ({
  iconName,
  headingTitle,
  headingDescription,
  hasIssues = false,
  issuesDescription = '',
}: SheetHeadingProps) => {
  return (
    <SheetHeader className='mt-3 text-start'>
      <Icon
        name={iconName}
        className='size-8'
      />

      {hasIssues && (
        <p className='text-success-700 xs:text-lg xs:font-semibold rtl:text-right'>
          {issuesDescription}
        </p>
      )}

      <SheetTitle className='mb-2 text-xl font-semibold text-secondary-900 max-sm:text-[24px] xs:text-[28px] xs:leading-9 xs:tracking-tight rtl:text-right'>
        {headingTitle}
      </SheetTitle>

      <SheetDescription className='text-base text-secondary-400 rtl:text-right'>
        {headingDescription}
      </SheetDescription>
    </SheetHeader>
  );
};

export default SheetHeading;
