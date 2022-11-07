// check when the user is logged in or not
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from '../screens/SignIn';

export const Routes = () => {
  return (
    <NavigationContainer>
      <SignIn />
    </NavigationContainer>
  );
};
