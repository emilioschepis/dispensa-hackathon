import { StyleSheet, Text as _Text, TextProps } from "react-native";

import DS, { TypographyType } from "../../style/DesignSystem";

type Props = TextProps & {
  variant?: TypographyType;
};

const Text = ({ children, style, variant = "TEXT", ...rest }: Props) => {
  return (
    <_Text {...rest} style={[styles.text, DS.Typography[variant], style]}>
      {children}
    </_Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: DS.Colors.BLACK,
  },
});

export default Text;
