import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";

import { ItemsInInventoryQuery } from "../generated/graphql";

type Props = {
  items: ItemsInInventoryQuery["items"];
};

const ITEM_HEIGHT = 64;

const EmptyInventory = () => {
  return (
    <View style={styles.empty}>
      <Text>Your inventory is currently empty.</Text>
    </View>
  );
};

const InventoryItem = ({ item }: { item: Props["items"][number] }) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Main", { screen: "Item", params: { productId: item.product.id } })}>
      <View style={styles.item}>
        <Text>
          {item.quantity}&times; {item.product.name}
        </Text>
      </View>
    </Pressable>
  );
};

const InventoryItemsList = ({ items }: Props) => {
  const renderItem = useCallback<ListRenderItem<Props["items"][number]>>(
    ({ item }) => <InventoryItem item={item} />,
    []
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.product.id}
      renderItem={renderItem}
      ListEmptyComponent={EmptyInventory}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    padding: 16,
    justifyContent: "center",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  empty: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
});

export default InventoryItemsList;
