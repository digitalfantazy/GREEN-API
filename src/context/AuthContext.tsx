import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface IUserData {
  avatar: string;
  phone: string;
  stateInstance: string;
  deviceId: string;
}

interface AuthContextType {
  idInstance: string;
  apiTokenInstance: string;
  userData: IUserData | null;
  isLoading: boolean;
  setAuthData: (idInstance: string, apiTokenInstance: string) => void;
  setUserData: (user: IUserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthData = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    localStorage.setItem('idInstance', idInstance);
    localStorage.setItem('apiTokenInstance', apiTokenInstance);
  };

  useEffect(() => {
    const savedId = localStorage.getItem('idInstance');
    const savedToken = localStorage.getItem('apiTokenInstance');
    const savedUser = localStorage.getItem('userData');

    if (savedId && savedToken) {
      setIdInstance(savedId);
      setApiTokenInstance(savedToken);
    }

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ idInstance, apiTokenInstance, userData, isLoading, setAuthData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
