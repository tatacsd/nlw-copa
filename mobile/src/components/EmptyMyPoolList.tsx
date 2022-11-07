import { Pressable, Row, Text } from 'native-base';

interface EmptyMyPoolListProps {
  code: string;
}

export function EmptyMyPoolList({ code }: EmptyMyPoolListProps) {
  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        This pool doesn't have participants yet, why don't you
      </Text>

      <Pressable onPress={() => {}}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          share the code
        </Text>
      </Pressable>

      <Text color="gray.200" fontSize="sm" mx={1}>
        with someone?
      </Text>

      <Text color="gray.200" mr={1}>
        Use the code
      </Text>

      <Text
        color="gray.200"
        fontSize="sm"
        textAlign="center"
        fontFamily="heading"
      >
        {code}
      </Text>
    </Row>
  );
}
