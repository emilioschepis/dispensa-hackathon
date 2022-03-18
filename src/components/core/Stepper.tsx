import { StyleSheet, View } from "react-native";

import DS from "../../style/DesignSystem";
import Icon from "./Icon";
import Pressable from "./Pressable";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const Stepper = ({ value, min, max, onIncrease, onDecrease }: Props) => {
  const canIncrease = max !== undefined ? value < max : true;
  const canDecrease = min !== undefined ? value > min : true;

  return (
    <View style={styles.container}>
      <Pressable disabled={!canDecrease} style={styles.portion} onPress={onDecrease}>
        <Icon name="MINUS" color={canDecrease ? DS.Colors.PRIMARY : DS.Colors.DISABLED} />
      </Pressable>
      <View style={styles.divider} />
      <Pressable disabled={!canIncrease} style={styles.portion} onPress={onIncrease}>
        <Icon name="PLUS" color={canIncrease ? DS.Colors.PRIMARY : DS.Colors.DISABLED} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    height: 44,
    backgroundColor: DS.Colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  portion: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 0,
    borderLeftWidth: 1,
    borderLeftColor: DS.Colors.GRAY,
  },
});

export default Stepper;
