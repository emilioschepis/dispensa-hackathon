import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import { CreateProductDocument } from "../generated/graphql";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type CreateProductScreenProps = NativeStackScreenProps<RootStackParamList, "CreateProduct">;
type Props = {} & CreateProductScreenProps;

const CreateProductScreen = ({ navigation }: Props) => {
  const [{ fetching }, _createProduct] = useMutation(CreateProductDocument);
  const [name, setName] = useState("");
  const inputRef = useRef<TextInput>(null);

  async function createProduct(name: string) {
    inputRef.current?.blur();

    try {
      await _createProduct({ name });
      navigation.navigate("Products");
    } catch (error) {}
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} value={name} onChangeText={setName} />
      <Button disabled={fetching || name.length === 0} title="Create" onPress={() => createProduct(name)} />
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
  },
});

export default CreateProductScreen;
