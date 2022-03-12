import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useMutation, useQuery } from "urql";

import { DeleteInventoryItemDocument, InventoryItemDocument, UpdateInventoryItemDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type InventoryItemScreenProps = NativeStackScreenProps<RootStackParamList, "InventoryItem">;
type Props = {} & InventoryItemScreenProps;

const InventoryItemScreen = ({ navigation, route }: Props) => {
  const [{ data, error, fetching }] = useQuery({
    query: InventoryItemDocument,
    variables: {
      productId: route.params.productId,
      inventoryId: route.params.inventoryId,
    },
  });
  const [{ fetching: updating }, updateInventoryItem] = useMutation(UpdateInventoryItemDocument);
  const [{ fetching: deleting }, deleteInventoryItem] = useMutation(DeleteInventoryItemDocument);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (data?.inventory_products_by_pk?.product.name) {
      navigation.setOptions({
        title: data.inventory_products_by_pk.product.name,
      });
    }
  }, [data?.inventory_products_by_pk?.product.name]);

  useEffect(() => {
    if (data?.inventory_products_by_pk?.quantity) {
      setQuantity(data.inventory_products_by_pk.quantity);
    }
  }, [data?.inventory_products_by_pk?.quantity]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load product.</Text>
      ) : fetching || !data?.inventory_products_by_pk ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{data.inventory_products_by_pk.product.name}</Text>
          <Text>You currently have {quantity} of them.</Text>

          <Button title="+" disabled={deleting || updating} onPress={() => setQuantity((q) => q + 1)} />
          <Button
            title="-"
            disabled={deleting || updating || quantity <= 1}
            onPress={() => setQuantity((q) => Math.max(q - 1, 1))}
          />
          <Button
            title="Save"
            disabled={deleting || updating}
            onPress={() =>
              updateInventoryItem({
                inventoryId: route.params.inventoryId,
                productId: route.params.productId,
                quantity,
              })
            }
          />
          <Button
            title="Delete"
            disabled={deleting || updating}
            onPress={() =>
              deleteInventoryItem({
                inventoryId: route.params.inventoryId,
                productId: route.params.productId,
              })
            }
          />
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

export default InventoryItemScreen;
