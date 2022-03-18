import { useMemo } from "react";
import { PressableProps, StyleSheet, TextStyle, View, ViewStyle } from "react-native";

import DS from "../../style/DesignSystem";
import Pressable from "./Pressable";
import Text from "./Text";

type Props = PressableProps & {
  title: string;
  variant?: "PRIMARY" | "SECONDARY" | "DESTRUCTIVE";
};

const Button = ({ title, disabled, variant = "PRIMARY", ...rest }: Props) => {
  const style = useMemo((): ViewStyle => {
    switch (variant) {
      case "PRIMARY":
        return {
          backgroundColor: disabled ? DS.Colors.DISABLED : DS.Colors.PRIMARY,
          paddingVertical: DS.Spacings.MD,
          paddingHorizontal: DS.Spacings.LG,
        };
      case "SECONDARY":
        return {
          backgroundColor: DS.Colors.WHITE,
          paddingVertical: DS.Spacings.MD,
          paddingHorizontal: DS.Spacings.LG,
          borderWidth: 2,
          borderColor: disabled ? DS.Colors.DISABLED : DS.Colors.PRIMARY,
        };
      case "DESTRUCTIVE":
        return {
          backgroundColor: disabled ? DS.Colors.DISABLED : DS.Colors.DESTRUCTIVE,
          paddingVertical: DS.Spacings.MD,
          paddingHorizontal: DS.Spacings.LG,
        };
    }
  }, [variant, disabled]);

  const textStyle = useMemo((): TextStyle => {
    switch (variant) {
      case "PRIMARY":
        return {
          color: DS.Colors.WHITE,
        };
      case "SECONDARY":
        return {
          color: disabled ? DS.Colors.DISABLED : DS.Colors.PRIMARY,
        };
      case "DESTRUCTIVE":
        return {
          color: DS.Colors.WHITE,
        };
    }
  }, [variant, disabled]);

  return (
    <Pressable disabled={disabled} {...rest}>
      <View style={[styles.container, style]}>
        <Text variant="TEXT_SM" numberOfLines={1} style={[styles.text, textStyle]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontFamily: "OpenSans-SemiBold",
    textTransform: "uppercase",
  },
});

export default Button;
