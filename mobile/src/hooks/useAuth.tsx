import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextDataProps } from '../interfaces/AuthContextDataProps';

export const useAuth = (): AuthContextDataProps => {
  return useContext(AuthContext);
};
