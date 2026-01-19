import Icon from '@/components/shared/Icon';

type WaitingSheetProps = {
  children: React.ReactNode;
};

const WaitingSheet = ({ children }: WaitingSheetProps) => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Icon name='clock' />
      {children}
    </div>
  );
};

export default WaitingSheet;
