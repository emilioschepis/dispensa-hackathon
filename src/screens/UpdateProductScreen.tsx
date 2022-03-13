import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import Scanner from "../components/Scanner";
import { DeleteProductDocument, UpdateProductDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";

export type UpdateProductScreenProps = NativeStackScreenProps<MainStackParamList, "UpdateProduct">;
type Props = {} & UpdateProductScreenProps;

const UpdateProductScreen = ({ navigation, route }: Props) => {
  const [{ fetching: updating }, _updateProduct] = useMutation(UpdateProductDocument);
  const [{ fetching: deleting }, _deleteProduct] = useMutation(DeleteProductDocument);
  const [name, setName] = useState(route.params.name);
  const [code, setCode] = useState<string | null>(route.params.code ?? null);
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<TextInput>(null);

  async function updateProduct(name: string, code: string | null) {
    // TODO: add product code when updating a product
    const result = await _updateProduct({ productId: route.params.productId, name, code });
    if (result.data && navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function deleteProduct() {
    const result = await _deleteProduct({ productId: route.params.productId });
    if (result.data) {
      navigation.navigate("Home");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} autoFocus value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <TextInput value={code ?? undefined} editable={false} placeholder="Code" style={styles.input} />
      {code ? (
        <Button title="Remove" disabled={updating || deleting} onPress={() => setCode(null)} />
      ) : (
        <Button
          title="Scan"
          disabled={updating || deleting}
          onPress={() => {
            inputRef.current?.blur();
            setScanning(true);
          }}
        />
      )}
      <Button
        title="Update"
        disabled={updating || deleting || name.length < 1}
        onPress={() => updateProduct(name, code)}
      />
      <Button title="Delete" disabled={updating || deleting} onPress={() => deleteProduct()} />
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
  },
});

export default UpdateProductScreen;
