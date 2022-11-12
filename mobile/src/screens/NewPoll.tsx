import { Heading, Text, useToast, VStack } from 'native-base';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import Logo from '../assets/logo.svg';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { api } from '../services/api';
export const NewPoll = () => {
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const handlePollCreation = async () => {
    if (!title.trim()) {
      return toast.show({
        title: 'Title is required',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      const createResponse = await api.post('/polls', {
        title,
      });
      const { code } = createResponse.data;

      toast.show({
        title: `Poll created successfully!\nCode: ${code}`,
        placement: 'top',
        bgColor: 'green.500',
      });

      Keyboard.dismiss();

      setTitle('');
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error creating poll',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };
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
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="CREATE MY POLL"
          onPress={handlePollCreation}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          After creating your pool, you will receive a unique code that you can
        </Text>
      </VStack>
    </VStack>
  );
};
