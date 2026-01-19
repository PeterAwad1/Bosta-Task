import { useAutoCloseSheet } from '@/hooks/useAutoCloseSheet';

import CancelGif from '/src/assets/gif/Cancel.gif';
type RemoveSheetProps = {
  text: string;
  onClose?: VoidFunction;
};

const RemovedSheet = ({
  onClose = () => {},
  children,
}: React.PropsWithChildren<RemoveSheetProps>) => {
  useAutoCloseSheet(onClose);
  return (
    <div className='my-auto flex flex-col items-center justify-center'>
      <img
        src={CancelGif}
        alt='Successfully gif'
        width={275}
        height={275}
      />

      {children}
    </div>
  );
};

export default RemovedSheet;
