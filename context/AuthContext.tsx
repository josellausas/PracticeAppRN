import { createContext, useState } from "react";

interface User {
  username: String;
}

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  isLoading: boolean;
  isError: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children?: React.ReactNode;
  title: String;
}

const LOGIN_URL = "https://google.com/"

export const AuthProvider: React.FC<Props> = (props) => {
  const {children} = props;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (_: string, _2: string) => {
    try {
      const response = await fetch(LOGIN_URL);
      if (response.status === 200) {
        //Success
        setIsAuth(true);
        setUser({
          username: "testUser",
        })
      }
    } catch {
      console.error("Login Error");
      setIsAuth(false);
      setIsError(true);
    }
  }

  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    setIsAuth(false);
    console.log("TODO");
    setIsLoading(false);
  }

  const clearError = () => {
    setIsError(false);
  }

  // TODO: Memoize functions
  const value: AuthContextType = {
    isAuth,
    user,
    isLoading,
    isError,
    login,
    logout,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}