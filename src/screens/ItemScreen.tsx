import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useQuery } from "urql";

import ErrorPanel from "../components/ErrorPanel";
import InventoryItem from "../components/InventoryItem";
import ProductNotInInventory from "../components/ProductNotInInventory";
import { InventoryItemDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";
import DS from "../style/DesignSystem";

export type ItemScreenProps = NativeStackScreenProps<MainStackParamList, "Item">;
type Props = {} & ItemScreenProps;

const ItemScreen = ({ route }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching, error, data }, refetch] = useQuery({
    query: InventoryItemDocument,
    variables: {
      inventoryId,
      productId: route.params.productId,
    },
  });

  return (
    <View style={styles.container}>
      {error ? (
        <ErrorPanel error="Could not load inventory item." />
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : !data.item ? (
        <ProductNotInInventory
          productId={route.params.productId}
          onAddToInventory={() => refetch({ requestPolicy: "network-only" })}
        />
      ) : (
        <InventoryItem item={data.item} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: DS.Spacings.XL,
  },
});

export default ItemScreen;
