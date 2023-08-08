import {createContext} from 'react';
import {useAuth} from '../auth/useAuth';

import type {User} from '../types/User';

interface AppContextInterface {
  user: User;
  RegisterWithEmailAndPass: Function;
  loginWithEmailAndPass: Function;
  logout: Function;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const AppProvider = ({children}: any) => {
  const {user, RegisterWithEmailAndPass, loginWithEmailAndPass, logout} =
    useAuth();

  return (
    <AppContext.Provider
      value={{user, loginWithEmailAndPass, RegisterWithEmailAndPass, logout}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
