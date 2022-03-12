import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { gql, useQuery } from "urql";

import ProductsList from "../components/ProductsList";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type ProductsScreenProps = NativeStackScreenProps<RootStackParamList, "Products">;
type Props = {} & ProductsScreenProps;

const ProductsQuery = gql`
  query Products {
    products {
      id
      name
    }
  }
`;

const ProductsScreen = ({}: Props) => {
  const [{ data, error, fetching }] = useQuery({
    query: ProductsQuery,
  });

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
