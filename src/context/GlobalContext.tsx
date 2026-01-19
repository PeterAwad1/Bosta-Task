/* eslint-disable react-refresh/only-export-components */
import { createContext, PropsWithChildren, useContext } from 'react';

// import { useParams } from 'react-router-dom';

// import { useAcademy } from '@/hooks/features/academies/useAcademyy';
// import { useUser } from '@/hooks/useUser';

// import { AcademyDetails, User } from '@/types';
type ContextType = {
  user: any;
  isUser: boolean;
 // isDefaultAdmin: boolean;
  // academy: AcademyDetails;
  // academyId: string;
};

export const GlobalContext = createContext<ContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: PropsWithChildren<{}>) => {
 // const { academyId } = useParams() as { academyId: string };
 // const { academy } = useAcademy();
  //const { user, isAuthenticated } = useUser();
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
  };
  const isAuthenticated = true;

  return (
    <GlobalContext.Provider
      value={{
        user,
        isUser: isAuthenticated,
       // isDefaultAdmin: user.role === 'DefaultAdmin',
        // academy,
        // academyId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalContext must be used inside the GlobalProvider');
  }

  return context;
};
