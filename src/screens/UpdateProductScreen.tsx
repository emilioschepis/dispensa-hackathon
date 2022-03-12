import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation, useQuery } from "urql";

import { ProductToUpdateDocument, UpdateProductDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type UpdateProductScreenProps = NativeStackScreenProps<RootStackParamList, "UpdateProduct">;
type Props = {} & UpdateProductScreenProps;

const UpdateProductScreen = ({ navigation, route }: Props) => {
  const [{ data, fetching }] = useQuery({ query: ProductToUpdateDocument, variables: { id: route.params.id } });
  const [{ fetching: updating }, updateProduct] = useMutation(UpdateProductDocument);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, requestPermission] = BarCodeScanner.usePermissions();
  const inputRef = useRef<TextInput>(null);

  async function saveProduct(name: string, code: string) {
    inputRef.current?.blur();

    try {
      await updateProduct({ id: route.params.id, name, code: code.length > 0 ? code : null });
      navigation.navigate("Products");
    } catch (error) {}
  }

  async function scanCode() {
    try {
      if (!status) return;

      if (status.granted) {
        navigation.navigate("Scanner", { source: { screen: "UpdateProduct", id: route.params.id } });
      } else if (status.canAskAgain) {
        const newPermissions = await requestPermission();
        if (newPermissions.granted) {
          navigation.navigate("Scanner", { source: { screen: "UpdateProduct", id: route.params.id } });
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (route.params?.code) {
      setCode(route.params.code);
      inputRef.current?.focus();
    }
  }, [route.params?.code]);

  useEffect(() => {
    if (data?.products_by_pk) {
      setName(data.products_by_pk.name);
      setCode(data.products_by_pk.code ?? "");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        editable={!(fetching || updating)}
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Product name"
      />
      <TextInput
        editable={!(fetching || updating)}
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Product code"
      />
      <Button
        disabled={fetching || updating || (!status?.granted && !status?.canAskAgain)}
        title="Scan"
        onPress={() => scanCode()}
      />
      <Button
        disabled={fetching || updating || name.length === 0}
        title="Save"
        onPress={() => saveProduct(name, code)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  input: {
    padding: 16,
    backgroundColor: "white",
    width: "100%",
    marginBottom: 8,
  },
});

export default UpdateProductScreen;
