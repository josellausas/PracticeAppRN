// import { createContext, useState } from "react";

// interface User {
//   username: String;
// }

// interface AuthContextType {
//   isAuth: boolean;
//   user: User | null;
//   isLoading: boolean;
//   isError: boolean;

//   // Actions
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface Props {
//   children?: React.ReactNode;
//   title: String;
// }

// export const AuthProvider: React.FC<Props> = (props) => {
//   const {children} = props;
//   const [isAuth, setIsAuth] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [user, setUser] = useState<User | null>(null);

//   const login = async (email: string, password: string) : Promise<void> => {
//     try {

//     } catch {

//     }
//   }

//   const value: AuthContextType = {
//     isAuth,
//     user,
//     isLoading,
//     isError,
//     login,
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }