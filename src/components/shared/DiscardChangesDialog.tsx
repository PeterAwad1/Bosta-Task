import { ReactNode } from 'react';

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

import { useDiscardChangesContext } from '@/context/DiscardChangesContext';

import useTranslations from '@/i18n/useTranslations';

type DiscardChangesDialogProps = {
  title: string;
  isLoading?: boolean;
  children: ReactNode;
};

const DiscardChangesDialog = ({
  title,
  isLoading,
  children,
}: DiscardChangesDialogProps) => {
  const { setSheetOpen, showWarningDialog, setShowWarningDialog } =
    useDiscardChangesContext();
  const { t, dir } = useTranslations();

  const handleDiscardChanges = () => {
    setShowWarningDialog(false);
    setSheetOpen(false);
  };

  const handleCancel = () => {
    setShowWarningDialog(false);
  };

  if (!showWarningDialog) return null;

  return (
    <Dialog
      open={showWarningDialog}
      onOpenChange={setShowWarningDialog}
    >
      <DialogContent
        dir={dir}
        className='sm:rounded-lg'
      >
        <DialogHeader>
          <DialogTitle className='text-center text-2xl font-semibold text-secondary-900'>
            {title}
          </DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter className='flex gap-4 sm:justify-center'>
          <DialogClose asChild>
            <Button
              variant='outline'
              onClick={handleCancel}
              className='w-full'
            >
              {t('buttons.cancel')}
            </Button>
          </DialogClose>
          <Button
            onClick={handleDiscardChanges}
            className='w-full'
          >
            {isLoading ? <Spinner /> : t('buttons.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiscardChangesDialog;
