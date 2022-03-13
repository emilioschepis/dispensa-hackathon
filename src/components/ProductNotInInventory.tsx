import { Button, StyleSheet, Text, View } from "react-native";
import { useMutation } from "urql";

import { AddProductToInventoryDocument } from "../generated/graphql";
import { useInventoryId } from "../state/InventoryContext";

type Props = {
  productId: string;
  onAddToInventory: () => void;
};

const ProductNotInInventory = ({ productId, onAddToInventory }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching }, addProduct] = useMutation(AddProductToInventoryDocument);

  return (
    <View style={styles.container}>
      <Text>This item is not in your inventory.</Text>
      <Button
        disabled={fetching}
        title="Add it now"
        onPress={() => addProduct({ inventoryId, productId }).then(() => onAddToInventory())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductNotInInventory;
