import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useMutation, useQuery } from "urql";

import InventoryList from "../components/InventoryList";
import { CreateDefaultInventoryDocument, InventoriesDocument, ProductsInInventoryDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type InventoryScreenProps = NativeStackScreenProps<RootStackParamList, "Inventory">;
type Props = {} & InventoryScreenProps;

const InventoryScreen = ({ navigation }: Props) => {
  const [{ data, error, fetching: fetchingInventories }, refetch] = useQuery({ query: InventoriesDocument });
  const [{}, createDefaultInventory] = useMutation(CreateDefaultInventoryDocument);
  const [{ data: products, fetching: fetchingProducts }] = useQuery({
    query: ProductsInInventoryDocument,
    variables: { id: data?.inventories[0].id ?? "" },
    pause: !data?.inventories?.[0],
  });

  useEffect(() => {
    if (!fetchingInventories && data?.inventories.length === 0) {
      // This is the first time that the user visits the inventory page.
      // Generate a default one.
      (async function () {
        try {
          await createDefaultInventory();
          refetch({ requestPolicy: "network-only" });
        } catch (error) {}
      })();
    }
  }, [fetchingInventories, data?.inventories]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load the inventories.</Text>
      ) : fetchingInventories || fetchingProducts || !data || !products ? (
        <ActivityIndicator />
      ) : data.inventories.length === 0 ? (
        <Text>Creating your inventory...</Text>
      ) : (
        <>
          <InventoryList inventoryId={data.inventories[0].id} products={products.inventory_products} />
        </>
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
