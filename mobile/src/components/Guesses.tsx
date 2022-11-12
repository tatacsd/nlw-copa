import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPollList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface GuessesProps {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: GuessesProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameProps[]>([] as GameProps[]);
  const [firstTeamPoints, setFirstTeamPoints] = useState<string>('');
  const [secondTeamPoints, setSecondTeamPoints] = useState<string>('');
  const toast = useToast();

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error fetching games',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoading) {
    return <Loading />;
  }

  const handleGuessConfirmed = async (gameId: string) => {
    try {
      // check if guesses are valid
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: 'Please fill in both guesses',
          placement: 'top',
          bgColor: 'red.500',
        });
        return;
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guess`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });
      toast.show({
        title: 'Guess confirmed!',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error confirming guess',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          key={item.id}
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirmed(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={<EmptyMyPollList code={code} />}
    />
  );
}
