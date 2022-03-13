import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { Button, FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";

import { ProductsQuery } from "../generated/graphql";
import { SearchScreenProps } from "../screens/SearchScreen";

type Props = {
  search: string;
  code: string | null;
  products: ProductsQuery["products"];
};

const ITEM_HEIGHT = 64;

const EmptySearchProduct = ({ search, code }: { search: Props["search"]; code: Props["code"] }) => {
  const navigation = useNavigation<SearchScreenProps["navigation"]>();

  return (
    <View style={styles.empty}>
      {code ? (
        <>
          <Text>There are no products with this code.</Text>
          <Button title="Create one now" onPress={() => navigation.replace("CreateProduct", { code })} />
        </>
      ) : (
        <>
          <Text>There are no products matching this text.</Text>
          <Button title="Create one now" onPress={() => navigation.replace("CreateProduct", { name: search })} />
        </>
      )}
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

const SearchProductsList = ({ products: _products, search, code }: Props) => {
  const products = useMemo(
    () => _products.filter((p) => (code ? p.code === code : p.name.toLowerCase().includes(search.toLowerCase()))),
    [_products, search, code]
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
      ListEmptyComponent={<EmptySearchProduct search={search} code={code} />}
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
