import { useAutoCloseSheet } from '@/hooks/useAutoCloseSheet';

import RemovedGif from '/src/assets/gif/Removed.gif';
type EditSheetProps = {
  children: React.ReactNode;
  onClose?: VoidFunction;
};
const RemovedSheet = ({ onClose = () => {}, children }: EditSheetProps) => {
  useAutoCloseSheet(onClose);
  return (
    <div className='my-auto flex flex-col items-center justify-center'>
      <img
        src={RemovedGif}
        alt='Successfully gif'
        width={275}
        height={275}
      />

      {children}
    </div>
  );
};

export default RemovedSheet;
