import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import { CreateProductInInventoryDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";

export type CreateProductScreenProps = NativeStackScreenProps<MainStackParamList, "CreateProduct">;
type Props = {} & CreateProductScreenProps;

const CreateProductScreen = ({ navigation, route }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching }, _createProduct] = useMutation(CreateProductInInventoryDocument);
  const [name, setName] = useState(route.params.name ?? "");

  async function createProduct(name: string) {
    // TODO: add product code when creating a new product
    const result = await _createProduct({ inventoryId, name });
    if (result.data?.insert_inventory_items_one?.product.id) {
      navigation.navigate("Item", { productId: result.data.insert_inventory_items_one.product.id });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <Button title="Create" disabled={fetching || name.length < 1} onPress={() => createProduct(name)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 16,
    backgroundColor: "white",
  },
});

export default CreateProductScreen;
