import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useMutation } from "urql";

import { InventoryItemQuery, UpdateItemDocument } from "../generated/graphql";
import { useInventoryId } from "../state/InventoryContext";

type Props = {
  item: NonNullable<InventoryItemQuery["item"]>;
};

const InventoryItem = ({ item }: Props) => {
  const inventoryId = useInventoryId();
  const [quantity, setQuantity] = useState(item.quantity);
  const [{ fetching }, updateItem] = useMutation(UpdateItemDocument);

  return (
    <View style={styles.container}>
      <Text>{item.product.name}</Text>
      <View style={styles.quantity}>
        <Button title="-" disabled={fetching || quantity <= 1} onPress={() => setQuantity((q) => q - 1)} />
        <Text>{quantity}</Text>
        <Button title="+" disabled={fetching} onPress={() => setQuantity((q) => q + 1)} />
      </View>
      <Button
        title="Save"
        disabled={fetching}
        onPress={() => updateItem({ inventoryId, productId: item.product.id, quantity })}
      />
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
