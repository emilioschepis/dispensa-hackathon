import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useQuery } from "urql";

import { UsersDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const HomeScreen = ({ navigation }: Props) => {
  const [{ data, error, fetching }] = useQuery({ query: UsersDocument });

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load the user.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <Text>Your username is {data.users[0].username}</Text>
      )}
      <Button title="Products" onPress={() => navigation.navigate("Products")} />
      <Button title="Inventory" onPress={() => navigation.navigate("Inventory")} />
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
