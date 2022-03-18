import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DS from "../style/DesignSystem";
import Icon from "./core/Icon";
import Pressable from "./core/Pressable";

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
  const dimensions = useWindowDimensions();
  const [scanning, setScanning] = useState(true);

  function onBarCodeScanned(event: BarCodeEvent) {
    _onBarCodeScanned(event.data);
    setScanning(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanning ? onBarCodeScanned : undefined}
        barCodeTypes={BAR_CODE_TYPES}
      />
      <View style={styles.watermark}>
        <Icon
          name="BARCODE"
          color="rgba(255, 255, 255, 0.2)"
          width={dimensions.width / 2}
          height={dimensions.width / 2}
        />
      </View>

      <View style={styles.close}>
        <Pressable onPress={onClose}>
          <View style={styles.watermarkBackground}>
            <Icon name="CANCEL" />
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
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
  watermark: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  watermarkBackground: {
    backgroundColor: DS.Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
    padding: DS.Spacings.XL,
  },
  close: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scanner;
