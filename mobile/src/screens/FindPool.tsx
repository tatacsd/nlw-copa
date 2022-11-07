import { Heading, VStack } from 'native-base';
import { Header } from '../components/Header';

import { Button } from '../components/Button';
import { Input } from '../components/Input';

export const FindPool = () => {
  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title="Find a pool" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Find a pool by its unique code
        </Heading>

        <Input mb={2} placeholder="What's the name of your pool?" />

        <Button title="FIND POOL" />
      </VStack>
    </VStack>
  );
};
