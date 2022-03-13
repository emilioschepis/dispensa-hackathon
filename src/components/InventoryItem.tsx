import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useMutation } from "urql";

import { DeleteItemDocument, InventoryItemQuery, UpdateItemDocument } from "../generated/graphql";
import { useInventoryId } from "../state/InventoryContext";

type Props = {
  item: NonNullable<InventoryItemQuery["item"]>;
};

const InventoryItem = ({ item }: Props) => {
  const navigation = useNavigation();
  const inventoryId = useInventoryId();
  const [quantity, setQuantity] = useState(item.quantity);
  const [{ fetching: updating }, updateItem] = useMutation(UpdateItemDocument);
  const [{ fetching: deleting }, _deleteItem] = useMutation(DeleteItemDocument);

  async function deleteItem() {
    const response = await _deleteItem({ inventoryId, productId: item.product.id });
    if (response.data && navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text>{item.product.name}</Text>
      <View style={styles.quantity}>
        <Button title="-" disabled={updating || deleting || quantity <= 0} onPress={() => setQuantity((q) => q - 1)} />
        <Text>{quantity}</Text>
        <Button title="+" disabled={updating || deleting} onPress={() => setQuantity((q) => q + 1)} />
      </View>
      {quantity === 0 ? (
        <Button title="Delete" disabled={updating || deleting} onPress={() => deleteItem()} />
      ) : (
        <Button
          title="Save"
          disabled={updating || deleting}
          onPress={() => updateItem({ inventoryId, productId: item.product.id, quantity })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  quantity: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InventoryItem;
