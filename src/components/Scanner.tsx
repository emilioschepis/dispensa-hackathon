import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

type Props = {
  onBarCodeScanned: (data: string) => void;
  onClose: () => void;
};

const BAR_CODE_TYPES = [
  BarCodeScanner.Constants.BarCodeType.codabar,
  BarCodeScanner.Constants.BarCodeType.ean8,
  BarCodeScanner.Constants.BarCodeType.ean13,
  BarCodeScanner.Constants.BarCodeType.upc_a,
  BarCodeScanner.Constants.BarCodeType.upc_e,
  BarCodeScanner.Constants.BarCodeType.upc_ean,
  BarCodeScanner.Constants.BarCodeType.qr,
];

// TODO: Handle camera permissions
const Scanner = ({ onBarCodeScanned: _onBarCodeScanned, onClose }: Props) => {
  const [scanning, setScanning] = useState(true);

  function onBarCodeScanned(event: BarCodeEvent) {
    _onBarCodeScanned(event.data);
    setScanning(false);
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanning ? onBarCodeScanned : undefined}
        barCodeTypes={BAR_CODE_TYPES}
      />
      <View style={styles.close}>
        <Button title="Close" onPress={() => onClose()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  close: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 2,
  },
});

export default Scanner;
