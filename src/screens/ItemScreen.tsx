import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useQuery } from "urql";

import { InventoryItemDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";

export type ItemScreenProps = NativeStackScreenProps<MainStackParamList, "Item">;
type Props = {} & ItemScreenProps;

const ItemScreen = ({ navigation, route }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching, error, data }] = useQuery({
    query: InventoryItemDocument,
    variables: {
      inventoryId,
      productId: route.params.productId,
    },
  });

  useEffect(() => {
    if (data?.item?.product.name) {
      navigation.setOptions({ title: data.item.product.name });
    }
  }, [data?.item?.product.name]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text>Could not load inventory item.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : !data.item ? (
        <Text>This item is not in your inventory.</Text>
      ) : (
        <Text>
          {data.item.quantity}&times; {data.item.product.name}
        </Text>
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

export default ItemScreen;
