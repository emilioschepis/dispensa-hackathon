import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useQuery } from "urql";

import ProductsList from "../components/ProductsList";
import { ProductsDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type ProductsScreenProps = NativeStackScreenProps<RootStackParamList, "Products">;
type Props = {} & ProductsScreenProps;

const ProductsScreen = ({}: Props) => {
  const [{ data, error, fetching }] = useQuery({ query: ProductsDocument });

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load the user.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <ProductsList products={data.products} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsScreen;
