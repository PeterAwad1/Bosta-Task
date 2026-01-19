import { useAutoCloseSheet } from '@/hooks/useAutoCloseSheet';

import SuccessGif from '/src/assets/gif/Success.gif';

type SuccessSheetProps = {
  children: React.ReactNode;
  onClose?: VoidFunction;
};

const SuccessSheet = ({ onClose = () => {}, children }: SuccessSheetProps) => {
  useAutoCloseSheet(onClose);
  return (
    <div className='flex h-full flex-col items-center justify-center rounded-l-2xl'>
      <img
        src={SuccessGif}
        alt='success-gif'
        width={275}
        height={275}
      />

      {children}
    </div>
  );
};

export default SuccessSheet;
