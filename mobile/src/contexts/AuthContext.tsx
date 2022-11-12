import { makeRedirectUri } from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import { maybeCompleteAuthSession } from 'expo-web-browser';
import { createContext, useEffect, useState } from 'react';
import { AuthContextDataProps } from '../interfaces/AuthContextDataProps';
import { AuthProviderProps } from '../interfaces/AuthProviderProps';
import { UserProps } from '../interfaces/UserProps';
import { api } from '../services/api';

maybeCompleteAuthSession();

export const AuthContext = createContext({} as AuthContextDataProps);

// it will share the context to all app
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [request, response, promptAsync] = useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: makeRedirectUri({ useProxy: true }),
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

  const signInWithGoogle = async (access_token: string) => {
    try {
      setIsUserLoading(true);
      const responseToken = await api.post('/users', {
        access_token,
      });
      console.warn('TOKEN --->', responseToken.data.token);

      // add as header of all requests to the api
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${responseToken.data.token}`;

      const userInfoResponse = await api.get('/me');
      console.warn('USER INFO SUB--->', userInfoResponse.data.user.sub);
      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.error(error);
      throw error; // it will throw the error to the component that called this function
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
      console.warn('RESPONSE --->', response);
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
