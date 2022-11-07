import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Icon, VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

export const Polls = () => {
  const { navigate } = useNavigation();
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
    </VStack>
  );
};
