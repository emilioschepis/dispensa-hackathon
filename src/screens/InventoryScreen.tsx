import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useMutation, useQuery } from "urql";

import { CreateDefaultInventoryDocument, InventoriesDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type InventoryScreenProps = NativeStackScreenProps<RootStackParamList, "Inventory">;
type Props = {} & InventoryScreenProps;

const InventoryScreen = ({ navigation }: Props) => {
  const [{ data, error, fetching }, refetch] = useQuery({ query: InventoriesDocument });
  const [{}, createDefaultInventory] = useMutation(CreateDefaultInventoryDocument);

  useEffect(() => {
    if (!fetching && data?.inventories.length === 0) {
      // This is the first time that the user visits the inventory page.
      // Generate a default one.
      (async function () {
        try {
          await createDefaultInventory();
          refetch({ requestPolicy: "network-only" });
        } catch (error) {}
      })();
    }
  }, [fetching, data?.inventories]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load the inventories.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : data.inventories.length === 0 ? (
        <Text>Creating your inventory...</Text>
      ) : (
        <Text>Inventory #{data.inventories[0].id}</Text>
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

export default InventoryScreen;
