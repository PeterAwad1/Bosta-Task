import { useEffect } from 'react';

export const useAutoCloseSheet = (
  onClose: () => void,
  delay: number = 2000,
) => {
  useEffect(() => {
    console.log('auto Close');
    const timer = setTimeout(onClose, delay);

    return () => {
      console.log('clear timer');
      clearTimeout(timer);
    };
  }, [onClose, delay]);
};
