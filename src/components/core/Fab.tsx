import { PressableProps, StyleSheet, View } from "react-native";

import DS from "../../style/DesignSystem";
import Icon, { Props as IconProps } from "./Icon";
import Pressable from "./Pressable";

type Props = PressableProps & {
  icon: IconProps["name"];
  color?: string;
  iconColor?: string;
};

const Fab = ({ icon, color = DS.Colors.PRIMARY, iconColor = DS.Colors.WHITE, ...rest }: Props) => {
  return (
    <Pressable {...rest}>
      <View style={[styles.container, { backgroundColor: color }]}>
        <Icon name={icon} color={iconColor} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...DS.Shadows.STRONG,
    height: 64,
    width: 64,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Fab;
