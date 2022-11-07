import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { createContext, useEffect, useState } from 'react';
import { AuthContextDataProps } from '../interfaces/AuthContextDataProps';
import { AuthProviderProps } from '../interfaces/AuthProviderProps';
import { UserProps } from '../interfaces/UserProps';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext({} as AuthContextDataProps);

// it will share the context to all app
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  });

  const signIn = async () => {
    try {
      setIsUserLoading(true);
      await promptAsync(); // start the auth flow
    } catch (error) {
      console.error(error);
      throw error; // it will throw the error to the component that called this function
    } finally {
      setIsUserLoading(false);
    }
  };

  const signInWithGoogle = async (accessToken: string) => {
    console.info('Auth token: ', accessToken);
  };

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};