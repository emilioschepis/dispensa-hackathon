import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import Button from "../components/core/Button";
import Input from "../components/core/Input";
import PressableIcon from "../components/core/PressableIcon";
import Spacer from "../components/core/Spacer";
import Scanner from "../components/Scanner";
import { DeleteProductDocument, UpdateProductDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import DS from "../style/DesignSystem";

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

  function confirmDeleteProduct() {
    Alert.alert("Deleting product", `Do you want to delete "${route.params.name}"? This action cannot be undone.`, [
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteProduct,
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Input ref={inputRef} autoFocus value={name} onChangeText={setName} placeholder="Name" />
      <Spacer height={DS.Spacings.LG} />
      <Input
        value={code ?? undefined}
        editable={false}
        placeholder="Code"
        rightIcon={
          code ? (
            <PressableIcon name="CANCEL" onPress={() => setCode(null)} />
          ) : (
            <PressableIcon
              name="BARCODE"
              onPress={() => {
                inputRef.current?.blur();
                setScanning(true);
              }}
            />
          )
        }
      />
      <Spacer height={DS.Spacings.LG} />

      <Button
        title="Save"
        disabled={updating || deleting || name.length < 1}
        onPress={() => updateProduct(name, code)}
      />
      <Spacer height={DS.Spacings.SM} />
      <Button
        title="Delete"
        variant="DESTRUCTIVE"
        disabled={updating || deleting}
        onPress={() => confirmDeleteProduct()}
      />
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
    padding: DS.Spacings.XL,
  },
});

export default UpdateProductScreen;
