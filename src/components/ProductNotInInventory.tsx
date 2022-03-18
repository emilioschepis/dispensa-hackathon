import { StyleSheet, View } from "react-native";
import { useMutation } from "urql";

import ShelfIllustration from "../../assets/illustrations/shelf.svg";
import { AddProductToInventoryDocument } from "../generated/graphql";
import { useInventoryId } from "../state/InventoryContext";
import DS from "../style/DesignSystem";
import Button from "./core/Button";
import Spacer from "./core/Spacer";
import Text from "./core/Text";

type Props = {
  productId: string;
  onAddToInventory: () => void;
};

const ProductNotInInventory = ({ productId, onAddToInventory }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching }, addProduct] = useMutation(AddProductToInventoryDocument);

  return (
    <View style={styles.container}>
      <ShelfIllustration />
      <Spacer height={DS.Spacings.LG} />
      <Text variant="H2">This item is not in your inventory.</Text>
      <Spacer height={DS.Spacings.LG} />
      <View style={styles.cta}>
        <Button
          disabled={fetching}
          title="Add it now"
          onPress={() => addProduct({ inventoryId, productId }).then(() => onAddToInventory())}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cta: {
    alignSelf: "stretch",
  },
});

export default ProductNotInInventory;
