import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';

export const SignIn = () => {
  return (
    <Center flex={1} bgColor={'gray.900'}>
      <Text
        color={'white'}
        fontSize={24}
        fontFamily={'heading'}
      >
        <Logo width={212} height={40} />
        Sign in
      </Text>
      <Button
        title={'Sign in with Google'}
        leftIcon={<Icon as={Fontisto} name="google" />}
        type={'SECONDARY'}
      />
    </Center>
  );
};
