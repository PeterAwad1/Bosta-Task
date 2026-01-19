// StackRoutesContext.tsx
import { createContext, ReactNode, useContext, useState } from 'react';

interface StackRoutesContextType {
  stack: string[];
  handleBack: VoidFunction;
  handleContent: (newContent: string) => void;
  shop: any | null;
  handleShop: (newShop: any) => void;
}
interface StackRoutesProviderProps {
  children: ReactNode;
  initialStack?: string[];
}
const StackRoutesContext = createContext<StackRoutesContextType | undefined>(
  undefined,
);

export const StackRoutesProvider = ({
  children,
  initialStack = [],
}: StackRoutesProviderProps) => {
  const [stack, setStack] = useState<string[]>(initialStack);
  const [shop, setShop] = useState<any | null>(null);

  function handleBack() {
    setStack((prevStack) => prevStack.slice(0, stack.length - 1));
  }

  function handleContent(newContent: string) {
    setStack((prevState) => [...prevState, newContent]);
  }

  function handleShop(newShop: any) {
    setShop(newShop);
  }

  return (
    <StackRoutesContext.Provider
      value={{ stack, handleBack, handleContent, shop, handleShop }}
    >
      {children}
    </StackRoutesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStackRoutesContext = (): StackRoutesContextType => {
  const context = useContext(StackRoutesContext);
  if (!context) {
    throw new Error(
      'useStackRoutesContext must be used within a StackRoutesProvider',
    );
  }
  return context;
};
