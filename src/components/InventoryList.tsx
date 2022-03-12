import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductsInInventoryQuery } from "../generated/graphql";
import { InventoryScreenProps } from "../screens/InventoryScreen";

type Props = {
  inventoryId: string;
  products: ProductsInInventoryQuery["inventory_products"];
};

const InventoryList = ({ inventoryId, products }: Props) => {
  const navigation = useNavigation<InventoryScreenProps["navigation"]>();

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={products}
      keyExtractor={(item) => item.product.id}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          onPress={() =>
            navigation.navigate("InventoryItem", {
              inventoryId,
              productId: item.product.id,
            })
          }
        >
          <View>
            <Text>
              {item.product.name} {item.product.code ? `(${item.product.code})` : null} - {item.quantity}
            </Text>
          </View>
        </Pressable>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>No products in this inventory</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InventoryList;
