import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import { CreateProductDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type CreateProductScreenProps = NativeStackScreenProps<RootStackParamList, "CreateProduct">;
type Props = {} & CreateProductScreenProps;

const CreateProductScreen = ({ navigation, route }: Props) => {
  const [{ fetching }, _createProduct] = useMutation(CreateProductDocument);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [status, requestPermission] = BarCodeScanner.usePermissions();
  const inputRef = useRef<TextInput>(null);

  async function createProduct(name: string, code: string) {
    inputRef.current?.blur();

    try {
      await _createProduct({ name, code: code.length > 0 ? code : null });
      navigation.navigate("Products");
    } catch (error) {}
  }

  async function scanCode() {
    try {
      if (!status) return;

      if (status.granted) {
        navigation.navigate("Scanner");
      } else if (status.canAskAgain) {
        const newPermissions = await requestPermission();
        if (newPermissions.granted) {
          navigation.navigate("Scanner");
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

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} value={name} onChangeText={setName} placeholder="Product name" />
      <TextInput style={styles.input} value={code} onChangeText={setCode} placeholder="Product code" />
      <Button
        disabled={fetching || (!status?.granted && !status?.canAskAgain)}
        title="Scan"
        onPress={() => scanCode()}
      />
      <Button disabled={fetching || name.length === 0} title="Create" onPress={() => createProduct(name, code)} />
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

export default CreateProductScreen;
