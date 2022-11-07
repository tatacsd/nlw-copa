import { Fontisto } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';

export const SignIn = () => {
  return (
    <Center flex={1} bgColor={'gray.900'} p={7}>
      <Logo width={212} height={40} />

      <Button
        title={'Sign in with Google'}
        leftIcon={<Icon as={Fontisto} name="google" />}
        type={'SECONDARY'}
        mt={7}
      />
      <Text color={'white'} textAlign={'center'} mt={4}>
        We don't use any information besides {'\n'}your
        email to create your account.
      </Text>
    </Center>
  );
};
