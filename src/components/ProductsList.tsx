import { useNavigation } from "@react-navigation/native";
import { Button, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useMutation } from "urql";

import { DeleteProductDocument, ProductsQuery } from "../generated/graphql";
import { ProductsScreenProps } from "../screens/ProductsScreen";

type Props = {
  products: ProductsQuery["products"];
};

const ProductsList = ({ products }: Props) => {
  const navigation = useNavigation<ProductsScreenProps["navigation"]>();
  const [{ fetching: deleting }, deleteProduct] = useMutation(DeleteProductDocument);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1.0 })}
          onPress={() => navigation.navigate("UpdateProduct", { id: item.id })}
        >
          <Text>
            {item.name} {item.code ? `(${item.code})` : null}
          </Text>
          <Button title="Delete" disabled={deleting} onPress={() => deleteProduct({ id: item.id })} />
        </Pressable>
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
