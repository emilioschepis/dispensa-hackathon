import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation } from "urql";

import { DeleteItemDocument, InventoryItemQuery, UpdateItemDocument } from "../generated/graphql";
import { useInventoryId } from "../state/InventoryContext";
import DS from "../style/DesignSystem";
import Button from "./core/Button";
import Icon from "./core/Icon";
import PressableIcon from "./core/PressableIcon";
import Spacer from "./core/Spacer";
import Stepper from "./core/Stepper";
import Text from "./core/Text";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableIcon
          name="EDIT"
          onPress={() =>
            navigation.navigate("Main", {
              screen: "UpdateProduct",
              params: { productId: item.product.id, name: item.product.name, code: item.product.code },
            })
          }
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        {item.quantity === quantity ? (
          <View style={styles.quantityContainer}>
            <Text variant="H0" style={styles.quantity}>
              {item.quantity}
            </Text>
          </View>
        ) : (
          <View style={styles.quantityContainer}>
            <Text variant="H0" style={styles.oldQuantity}>
              {item.quantity}
            </Text>
            <Icon name="DOUBLE_RIGHT" />
            <Text variant="H0" style={styles.newQuantity}>
              {quantity}
            </Text>
          </View>
        )}
        <Spacer height={DS.Spacings.MD} />
        <Stepper
          value={quantity}
          min={0}
          onIncrease={() => setQuantity((q) => q + 1)}
          onDecrease={() => setQuantity((q) => q - 1)}
        />
        <Spacer height={DS.Spacings.SM} />
        <Button
          title="Save"
          disabled={updating || deleting || quantity === item.quantity}
          onPress={() => {
            if (quantity > 0) {
              updateItem({ inventoryId, productId: item.product.id, quantity });
            } else {
              deleteItem();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  panel: {
    ...DS.Shadows.DEFAULT,
    padding: DS.Spacings.MD,
    backgroundColor: DS.Colors.WHITE,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  code: {
    color: DS.Colors.DARK_GRAY,
  },
  quantity: {
    color: DS.Colors.BLACK,
  },
  oldQuantity: {
    color: DS.Colors.DARK_GRAY,
    marginRight: DS.Spacings.MD,
  },
  newQuantity: {
    color: DS.Colors.BLACK,
    marginLeft: DS.Spacings.MD,
  },
});

export default InventoryItem;
