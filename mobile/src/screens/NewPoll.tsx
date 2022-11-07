import { Heading, Text, VStack } from 'native-base';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export const NewPoll = () => {
  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title="Create a new pool" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Create your own pool and share it with friends!
        </Heading>

        <Input
          mb={2}
          placeholder="What's the name of your pool?"
          onChangeText={() => {
            console.log('onChangeText');
          }}
        />

        <Button title="CREATE MY POLL" onPress={() => console.log('teste')} />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating your pool, you will receive a unique code that you can
        </Text>
      </VStack>
    </VStack>
  );
};
