import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductsQuery } from "../generated/graphql";
import { SearchScreenProps } from "../screens/SearchScreen";

type Props = {
  search: string;
  products: ProductsQuery["products"];
};

const ITEM_HEIGHT = 64;

const EmptySearchProduct = () => {
  return (
    <View style={styles.empty}>
      <Text>There are no products matching this text.</Text>
    </View>
  );
};

const SearchProduct = ({ item }: { item: Props["products"][number] }) => {
  const navigation = useNavigation<SearchScreenProps["navigation"]>();

  return (
    <Pressable onPress={() => navigation.replace("Item", { productId: item.id })}>
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const SearchProductsList = ({ products: _products, search }: Props) => {
  const products = useMemo(
    () => _products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [_products, search]
  );

  const renderItem = useCallback<ListRenderItem<Props["products"][number]>>(
    ({ item }) => <SearchProduct item={item} />,
    []
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListEmptyComponent={EmptySearchProduct}
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

export default SearchProductsList;
