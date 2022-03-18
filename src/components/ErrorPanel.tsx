import { StyleSheet, View } from "react-native";

import DS from "../style/DesignSystem";
import Icon from "./core/Icon";
import Text from "./core/Text";

type Props = {
  error: string;
};

const ErrorPanel = ({ error }: Props) => {
  return (
    <View style={styles.container}>
      <Icon name="WARNING" color={DS.Colors.ERROR} />
      <Text style={styles.text}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans-SemiBold",
    color: DS.Colors.ERROR,
    textAlign: "center",
  },
});

export default ErrorPanel;
