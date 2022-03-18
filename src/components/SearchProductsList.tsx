import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { FlatList, Keyboard, ListRenderItem, Pressable, StyleSheet, View } from "react-native";

import { ProductsQuery } from "../generated/graphql";
import { SearchScreenProps } from "../screens/SearchScreen";
import DS from "../style/DesignSystem";
import Button from "./core/Button";
import Icon from "./core/Icon";
import Spacer from "./core/Spacer";
import Text from "./core/Text";

type Props = {
  search: string;
  code: string | null;
  products: ProductsQuery["products"];
};

const ITEM_HEIGHT = 56;

const EmptySearchProduct = ({ search, code }: { search: Props["search"]; code: Props["code"] }) => {
  const navigation = useNavigation<SearchScreenProps["navigation"]>();

  return (
    <View style={styles.empty}>
      {code ? (
        <>
          <Text style={styles.emptyText}>There are no products with this code.</Text>
          <Spacer height={DS.Spacings.SM} />
          <Button title="Create one now" onPress={() => navigation.replace("CreateProduct", { code })} />
        </>
      ) : (
        <>
          <Text style={styles.emptyText}>There are no products with this name.</Text>
          <Spacer height={DS.Spacings.SM} />
          <Button title="Create one now" onPress={() => navigation.replace("CreateProduct", { name: search })} />
        </>
      )}
    </View>
  );
};

const SearchProduct = ({ item, search }: { item: Props["products"][number]; search: Props["search"] }) => {
  const navigation = useNavigation<SearchScreenProps["navigation"]>();

  const matchIndex = useMemo(() => {
    return item.name.toLowerCase().indexOf(search.toLowerCase());
  }, [item.name, search]);

  return (
    <Pressable onPress={() => navigation.push("Item", { productId: item.id, name: item.name })}>
      <View style={styles.item}>
        <Text>
          {item.name.substring(0, matchIndex)}
          <Text style={styles.strongText}>{item.name.substring(matchIndex, matchIndex + search.length)}</Text>
          {item.name.substring(matchIndex + search.length)}
        </Text>
        <Icon name="CHEVRON_RIGHT" />
      </View>
    </Pressable>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SearchProductsList = ({ products: _products, search, code }: Props) => {
  const products = useMemo(
    () => _products.filter((p) => (code ? p.code === code : p.name.toLowerCase().includes(search.toLowerCase()))),
    [_products, search, code]
  );

  const renderItem = useCallback<ListRenderItem<Props["products"][number]>>(
    ({ item }) => <SearchProduct item={item} search={search} />,
    [search]
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
      ItemSeparatorComponent={ItemSeparator}
      showsVerticalScrollIndicator={false}
      onScrollBeginDrag={Keyboard.dismiss}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    padding: DS.Spacings.SM,
    backgroundColor: DS.Colors.WHITE,
    borderRadius: 8,
    justifyContent: "center",
  },
  item: {
    height: ITEM_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  empty: {
    justifyContent: "center",
    marginTop: DS.Spacings.XL,
  },
  emptyText: {
    marginBottom: DS.Spacings.MD,
    alignSelf: "center",
  },
  separator: {
    height: 0,
    borderTopWidth: 2,
    borderTopColor: DS.Colors.LIGHT_GRAY,
  },
  strongText: {
    fontFamily: "OpenSans-SemiBold",
  },
});

export default SearchProductsList;
