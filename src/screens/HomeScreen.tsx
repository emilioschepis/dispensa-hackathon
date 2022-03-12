import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { gql, useQuery } from "urql";

import { RootStackParamList } from "../navigation/navigators/RootStack";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const UsersQuery = gql`
  query Users {
    users(limit: 1) {
      id
      username
      email
    }
  }
`;

const HomeScreen = ({}: Props) => {
  const [{ data, error, fetching }] = useQuery({
    query: UsersQuery,
  });

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load the user.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <Text>Your username is {data.users[0].username}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
