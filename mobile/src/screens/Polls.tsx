import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Button } from '../components/Button';
import { EmptyPollList } from '../components/EmptyPollList';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PollCard, PollCardsProps } from '../components/PollCard';
import { api } from '../services/api';

export const Polls = () => {
  const [polls, setPolls] = useState<PollCardsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { navigate } = useNavigation();

  const getPolls = async () => {
    try {
      setIsLoading(true);
      const [responsePolls, responseMe] = await Promise.all([
        api.get('/polls'),
        api.get('/me'),
      ]);
      setPolls(responsePolls.data.polls);
      const me = responseMe.data.user.sub;
      const myPolls = responsePolls.data.polls.filter((poll: PollCardsProps) =>
        poll.participants.map((participant) => participant.id).includes(me)
      );
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error loading polls',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor={'gray.900'}>
      <Header title="My polls" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="FIND POLL BY CODE"
          leftIcon={
            <Icon as={Octicons} name="search" size="sm" color="black" />
          }
          onPress={() => navigate('findPoll')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          ListEmptyComponent={() => <EmptyPollList />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ px: 5, pb: 40 }}
        />
      )}
    </VStack>
  );
};
