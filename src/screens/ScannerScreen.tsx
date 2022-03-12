import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "../navigation/navigators/RootStack";

export type ScannerScreenProps = NativeStackScreenProps<RootStackParamList, "Scanner">;
type Props = {} & ScannerScreenProps;

const BARCODE_TYPES: string[] = [BarCodeScanner.Constants.BarCodeType.qr, BarCodeScanner.Constants.BarCodeType.codabar];

const ScannerScreen = ({ navigation }: Props) => {
  const [isScanning, setScanning] = useState(true);

  async function onBarCodeScanned(params: BarCodeEvent) {
    setScanning(false);
    navigation.navigate("CreateProduct", { code: params.data });
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
