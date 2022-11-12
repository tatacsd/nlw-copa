import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { EmptyMyPollList } from '../components/EmptyMyPoolList';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { Option } from '../components/Option';
import { PollCardsProps } from '../components/PollCard';
import { PollHeader } from '../components/PollHeader';
import { api } from '../services/api';

interface RouteParams {
  id: string;
}

export const Details = () => {
  const { id } = useRoute().params as RouteParams;
  const [poll, setPoll] = useState<PollCardsProps>({} as PollCardsProps);
  const [options, setOptions] = useState<'guesses' | 'ranking'>('guesses');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const fetchPollByCode = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/polls/${id}`);
      setPoll(response?.data?.poll);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error fetching poll details',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareCode = async () => {
    Share.share({
      title: 'Hey, check out this poll I created on Friendly Cup!',
      message: `${poll?.code}`,
    });
  };

  useEffect(() => {
    fetchPollByCode();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header
        title={poll?.title}
        showBackButton
        showShareButton
        onShare={handleShareCode}
      />
      {poll._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PollHeader data={poll} />
          <HStack bg={'gray.800'} p={1} rounded={'sm'} mb={5}>
            <Option
              isSelected={options === 'guesses'}
              title={'Guesses'}
              onPress={() => setOptions('guesses')}
            />
            <Option
              isSelected={options === 'ranking'}
              title={'Group Ranking'}
              onPress={() => setOptions('ranking')}
            />
          </HStack>
          <Guesses pollId={poll.id} code={poll.code} />
        </VStack>
      ) : (
        <EmptyMyPollList code={poll.code} />
      )}
    </VStack>
  );
};
