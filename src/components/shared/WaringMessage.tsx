import { ReactNode, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import Spinner from './loaders/Spinner';

import useTranslations from '@/i18n/useTranslations';

type WarningButtonProps = {
  title: string;
  onClose: VoidFunction;
  onCancel: VoidFunction;
  isLoading?: boolean;
  children: ReactNode;
};

const WarningCloseButton = ({
  title,
  onClose,
  onCancel,
  isLoading,
  children,
}: WarningButtonProps) => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslations();
  async function handleClose() {
    onClose();
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className='sm:rounded-lg'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-semibold text-secondary-900'>
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant='outline'
              onClick={onCancel}
            >
              {t('Cancel')}
            </Button>
          </DialogClose>
          <Button onClick={handleClose}>
            {isLoading ? <Spinner /> : t('Close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningCloseButton;
