import { FlatList, StyleSheet, Text, View } from "react-native";

import { ProductsQuery } from "../generated/graphql";

type Props = {
  products: ProductsQuery["products"];
};

const ProductsList = ({ products }: Props) => {
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text>
          {item.name} {item.code ? `(${item.code})` : null}
        </Text>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>No products</Text>
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

export default ProductsList;
