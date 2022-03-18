import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Dimensions, FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { ItemsInInventoryQuery } from "../generated/graphql";
import DS from "../style/DesignSystem";
import Button from "./core/Button";
import Icon from "./core/Icon";
import Pressable from "./core/Pressable";
import Spacer from "./core/Spacer";
import Text from "./core/Text";

type Props = {
  items: ItemsInInventoryQuery["products"];
};

function sortProductsOutsideInventoryLast(a: Props["items"][number], b: Props["items"][number]) {
  if (a.inventory_items.length !== b.inventory_items.length) {
    return b.inventory_items.length - a.inventory_items.length;
  }

  return 0;
}

const ITEM_HEIGHT = 70;

const InventoryHeader = () => {
  return (
    <Text variant="H1" style={styles.header}>
      Your inventory
    </Text>
  );
};

const EmptyInventory = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.empty}>
      <Text>Your inventory is empty, start now by creating your first product.</Text>
      <Spacer height={DS.Spacings.LG} />
      <Button title="Create" onPress={() => navigation.navigate("Main", { screen: "CreateProduct", params: {} })} />
    </View>
  );
};

const InventoryItem = ({ item }: { item: Props["items"][number] }) => {
  const navigation = useNavigation();
  const quantity = item.inventory_items[0]?.quantity ?? 0;

  return (
    <Pressable
      onPress={() => navigation.navigate("Main", { screen: "Item", params: { productId: item.id, name: item.name } })}
    >
      <View style={styles.item}>
        <Text variant="H2" style={[styles.quantity, quantity === 0 && styles.quantity0]}>
          {quantity} &times;
        </Text>
        <View style={styles.name}>
          <Text variant="TEXT_LG" numberOfLines={2} style={[quantity === 0 && styles.name0]}>
            {item.name}
          </Text>
        </View>
        <Icon name="CHEVRON_RIGHT" />
      </View>
    </Pressable>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const InventoryItemsList = ({ items }: Props) => {
  const renderItem = useCallback<ListRenderItem<Props["items"][number]>>(
    ({ item }) => <InventoryItem item={item} />,
    []
  );

  return (
    <FlatList
      bounces={false}
      data={items.sort(sortProductsOutsideInventoryLast)}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={EmptyInventory}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      contentInsetAdjustmentBehavior="always"
      getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
      ListHeaderComponent={InventoryHeader}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DS.Spacings.LG,
  },
  contentContainer: {
    ...DS.Shadows.DEFAULT,
    flexGrow: 1,
    backgroundColor: DS.Colors.WHITE,
    padding: DS.Spacings.XXL,
    borderRadius: 16,
    marginTop: Dimensions.get("screen").width * 0.3 + DS.Spacings.XXL,
    paddingBottom: 200,
  },
  emptyContentContainer: {
    justifyContent: "center",
  },
  item: {
    height: ITEM_HEIGHT,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  quantity: {
    marginRight: DS.Spacings.LG,
  },
  quantity0: {
    color: DS.Colors.DARK_GRAY,
  },
  name: {
    flex: 1,
    marginRight: DS.Spacings.LG,
  },
  name0: {
    color: DS.Colors.DARK_GRAY,
  },
  header: {},
  empty: {
    justifyContent: "center",
    marginTop: DS.Spacings.MD,
  },
  separator: {
    height: 0,
    borderTopWidth: 2,
    borderTopColor: DS.Colors.LIGHT_GRAY,
  },
});

export default InventoryItemsList;
