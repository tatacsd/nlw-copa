import { UserProps } from './UserProps';

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  isUserLoading: boolean;
}
