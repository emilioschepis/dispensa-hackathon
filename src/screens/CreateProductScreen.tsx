import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useMutation } from "urql";

import Button from "../components/core/Button";
import Input from "../components/core/Input";
import PressableIcon from "../components/core/PressableIcon";
import Spacer from "../components/core/Spacer";
import Scanner from "../components/Scanner";
import { CreateProductInInventoryDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";
import DS from "../style/DesignSystem";

export type CreateProductScreenProps = NativeStackScreenProps<MainStackParamList, "CreateProduct">;
type Props = {} & CreateProductScreenProps;

const CreateProductScreen = ({ navigation, route }: Props) => {
  const inventoryId = useInventoryId();
  const [{ fetching }, _createProduct] = useMutation(CreateProductInInventoryDocument);
  const [name, setName] = useState(route.params.name ?? "");
  const [code, setCode] = useState(route.params.code ?? "");
  const [status, requestPermission] = BarCodeScanner.usePermissions();
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const scannerBlocked = !status?.granted && !status?.canAskAgain;

  async function createProduct(name: string) {
    const result = await _createProduct({ inventoryId, name, code: code.length > 0 ? code : null });
    if (result.data?.insert_inventory_items_one?.product.id) {
      navigation.replace("Item", {
        productId: result.data.insert_inventory_items_one.product.id,
        name: result.data.insert_inventory_items_one.product.name,
      });
    }
  }

  return (
    <View style={styles.container}>
      <Input ref={inputRef} autoFocus value={name} onChangeText={setName} placeholder="Product name" />

      <Spacer height={DS.Spacings.LG} />

      <Input
        value={code}
        onChangeText={setCode}
        placeholder="Product code"
        rightIcon={
          <PressableIcon
            disabled={scannerBlocked}
            name="BARCODE"
            onPress={async () => {
              inputRef.current?.blur();

              if (status?.granted) {
                setScanning(true);
              } else if (status?.canAskAgain) {
                const newPermission = await requestPermission();
                if (newPermission.granted) {
                  setScanning(true);
                }
              }
            }}
          />
        }
      />

      <Spacer height={DS.Spacings.LG} />

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
    padding: DS.Spacings.XL,
  },
});

export default CreateProductScreen;
