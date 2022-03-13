import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import Scanner from "../components/Scanner";
import { CreateProductInInventoryDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";

export type CreateProductScreenProps = NativeStackScreenProps<MainStackParamList, "CreateProduct">;
type Props = {} & CreateProductScreenProps;

const CreateProductScreen = ({ navigation, route }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching }, _createProduct] = useMutation(CreateProductInInventoryDocument);
  const [name, setName] = useState(route.params.name ?? "");
  const [code, setCode] = useState(route.params.code ?? null);
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<TextInput>(null);

  async function createProduct(name: string) {
    const result = await _createProduct({ inventoryId, name, code });
    if (result.data?.insert_inventory_items_one?.product.id) {
      navigation.navigate("Item", { productId: result.data.insert_inventory_items_one.product.id });
    }
  }

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} autoFocus value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <TextInput value={code ?? undefined} editable={false} placeholder="Code" style={styles.input} />
      {code ? (
        <Button title="Remove" disabled={fetching} onPress={() => setCode(null)} />
      ) : (
        <Button
          title="Scan"
          disabled={fetching}
          onPress={() => {
            inputRef.current?.blur();
            setScanning(true);
          }}
        />
      )}
      <Button title="Create" disabled={fetching || name.length < 1} onPress={() => createProduct(name)} />
      {scanning ? (
        <Scanner
          onBarCodeScanned={(data) => {
            setCode(data);
            setScanning(false);
            inputRef.current?.focus();
          }}
          onClose={() => {
            setScanning(false);
            inputRef.current?.focus();
          }}
        />
      ) : null}
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
    marginBottom: 8,
  },
});

export default CreateProductScreen;
