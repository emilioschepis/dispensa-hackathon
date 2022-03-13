import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useQuery } from "urql";

import InventoryItemsList from "../components/InventoryItemsList";
import { ItemsInInventoryDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";

export type HomeScreenProps = NativeStackScreenProps<MainStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const HomeScreen = ({ navigation }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching, error, data }] = useQuery({ query: ItemsInInventoryDocument, variables: { inventoryId } });

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load items in inventory.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <InventoryItemsList items={data.items} />
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
