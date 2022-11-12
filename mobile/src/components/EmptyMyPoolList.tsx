import { Pressable, Row, Text } from 'native-base';
import { Share } from 'react-native';

interface EmptyMyPollListProps {
  code: string;
}

export function EmptyMyPollList({ code }: EmptyMyPollListProps) {
  const handleShare = async () => {
    await Share.share({
      message: `${code}`,
    });
  };
  return (
    <Row flexWrap="wrap" justifyContent="center" p={4}>
      <Text color="gray.200" fontSize="sm">
        This poll doesn't have participants yet, why don't you
      </Text>

      <Pressable onPress={handleShare}>
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
