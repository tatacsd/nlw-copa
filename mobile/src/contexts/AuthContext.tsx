import { createContext } from 'react';

interface UserProps {
  name: string;
  avatarURL: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext(
  {} as AuthContextDataProps
);

interface AuthProviderProps {
  children: React.ReactNode;
}
// it will share the context to all app
export const AuthContextProvider = ({
  children,
}: AuthProviderProps) => {
  const signInWithGoogle = async () => {
    console.log('signInWithGoogle');
  };
  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        user: {
          name: 'Thays Casado',
          avatarURL: 'http://github.com/tatacsd.png',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
