import { createContext, PropsWithChildren, useContext, useState } from 'react';

import DiscardChangesDialog from '@/components/shared/DiscardChangesDialog';

import useTranslations from '@/i18n/useTranslations';

type ContextType = {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showWarningDialog: boolean;
  setShowWarningDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  handleSheetOpenChange: (open: boolean) => void;
};

export const DiscardChangesContext = createContext<ContextType | undefined>(
  undefined,
);

export const DiscardChangesProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [showWarningDialog, setShowWarningDialog] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const { t } = useTranslations();
  function handleSheetOpenChange(open: boolean) {
    if (!open && isDirty) {
      setShowWarningDialog(true);
    } else {
      setSheetOpen(open);
      setIsDirty(false);
    }
  }

  return (
    <DiscardChangesContext.Provider
      value={{
        sheetOpen,
        setSheetOpen,
        showWarningDialog,
        setShowWarningDialog,
        isDirty,
        setIsDirty,
        handleSheetOpenChange,
      }}
    >
      {children}

      <DiscardChangesDialog title={t('Unsaved Changes')}>
        <p className='text-center text-secondary-400'>
          {t('You have unsaved changes Are you sure you want to discard them')}
        </p>
      </DiscardChangesDialog>
    </DiscardChangesContext.Provider>
  );
};

export const useDiscardChangesContext = () => {
  const context = useContext(DiscardChangesContext);

  if (!context) {
    throw new Error(
      'useDiscardChangesContext must be used inside the DiscardChangesProvider',
    );
  }

  return context;
};
