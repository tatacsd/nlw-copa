import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { PollCardsProps } from '../components/PollCard';
import { api } from '../services/api';

export const FindPoll = () => {
  const [code, setcode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [poll, setPoll] = useState<PollCardsProps | null>(null);
  const toast = useToast();
  const { navigate } = useNavigation();

  const handleFindPollByCode = async () => {
    try {
      Keyboard.dismiss();
      setIsLoading(true);
      if (!code.trim()) {
        toast.show({
          title: 'Code is required',
          bgColor: 'red.500',
          placement: 'top',
        });
        return;
      }
      console.warn('CODE --->', code);

      const response = await api.post('polls/join', { code });
      console.log(response);
      toast.show({
        title: 'You have joined the poll',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        bgColor: 'green.500',
        placement: 'top',
      });
      navigate('polls');
    } catch (error) {
      console.log(error.response?.data?.message ?? error);
      toast.show({
        bgColor: 'red.500',
        placement: 'top',
        title:
          `${error.response?.data?.message}` ??
          `Error trying to find poll: ${error.message}`,
        duration: 3000,
      });

      setIsLoading(false);
    }
  };

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

        <Input
          mb={2}
          autoCapitalize="characters"
          placeholder="What's the name of your pool?"
          onChangeText={setcode}
          value={code}
        />

        <Button
          title="FIND POOL"
          onPress={handleFindPollByCode}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
};
