import { useState } from 'react';

const useCloseSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  function handleCloseSheet() {
    if (isDirty) {
      setShowWarning(true);
    } else {
      setIsOpen(false);
      //   onCloseSheet(false);
    }
  }
  return {
    isOpen,
    setIsOpen,
    showWarning,
    setShowWarning,
    isDirty,
    setIsDirty,
    handleCloseSheet,
  };
};

export default useCloseSheet;
