import { useAutoCloseSheet } from '@/hooks/useAutoCloseSheet';

import EditGif from '/src/assets/gif/Edit.gif';

type EditSheetProps = {
  children: React.ReactNode;
  onClose?: VoidFunction;
};
const EditSheet = ({ onClose = () => {}, children }: EditSheetProps) => {
  useAutoCloseSheet(onClose);
  return (
    <div className='flex h-full flex-col items-center justify-center gap-8 rounded-l-2xl'>
      <img
        src={EditGif}
        alt='Successfully gif'
        width={275}
        height={275}
      />
      {children}
    </div>
  );
};

export default EditSheet;
