import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import { DeleteProductDocument, UpdateProductDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";

export type UpdateProductScreenProps = NativeStackScreenProps<MainStackParamList, "UpdateProduct">;
type Props = {} & UpdateProductScreenProps;

const UpdateProductScreen = ({ navigation, route }: Props) => {
  const [{ fetching: updating }, _updateProduct] = useMutation(UpdateProductDocument);
  const [{ fetching: deleting }, _deleteProduct] = useMutation(DeleteProductDocument);
  const [name, setName] = useState(route.params.name);
  const inputRef = useRef<TextInput>(null);

  async function updateProduct(name: string) {
    // TODO: add product code when updating a product
    const result = await _updateProduct({ productId: route.params.productId, name });
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      <Button title="Update" disabled={updating || deleting || name.length < 1} onPress={() => updateProduct(name)} />
      <Button title="Delete" disabled={updating || deleting} onPress={() => deleteProduct()} />
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
