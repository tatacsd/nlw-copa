import { useNavigation } from '@react-navigation/native';
import { Pressable, Row, Text } from 'native-base';

export function EmptyPollList() {
  const { navigate } = useNavigation();
  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        You are not participating in any pool yet, why don't you
      </Text>

      <Pressable onPress={() => navigate('findPoll')}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          search for one by code
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        or
      </Text>

      <Pressable onPress={() => navigate('newPoll')}>
        <Text textDecorationLine="underline" color="yellow.500">
          create a new one
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}
