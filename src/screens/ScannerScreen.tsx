import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "../navigation/navigators/RootStack";

export type ScannerScreenProps = NativeStackScreenProps<RootStackParamList, "Scanner">;
type Props = {} & ScannerScreenProps;

const BARCODE_TYPES: string[] = [BarCodeScanner.Constants.BarCodeType.qr, BarCodeScanner.Constants.BarCodeType.codabar];

const ScannerScreen = ({ navigation, route }: Props) => {
  const [isScanning, setScanning] = useState(true);

  async function onBarCodeScanned(params: BarCodeEvent) {
    setScanning(false);

    if (!route.params) return;
    switch (route.params.source.screen) {
      case "CreateProduct":
        navigation.navigate("CreateProduct", { code: params.data });
        break;
      case "UpdateProduct":
        navigation.navigate("UpdateProduct", { id: route.params.source.id, code: params.data });
        break;
    }
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={isScanning ? onBarCodeScanned : undefined}
        barCodeTypes={BARCODE_TYPES}
      />
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

export default ScannerScreen;
