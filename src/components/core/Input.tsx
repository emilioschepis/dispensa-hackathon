import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import DS from "../../style/DesignSystem";
import Text from "./Text";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  rightIcon?: React.ReactNode;
};

const Input = forwardRef<TextInput, Props>(({ label, error, style, rightIcon, editable = true, ...rest }, ref) => {
  const hasError = Boolean(error);
  const hasRightIcon = Boolean(rightIcon);

  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="TEXT_SM" style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View style={[styles.wrapper, hasError && styles.wrapperError]}>
        <TextInput
          ref={ref}
          accessibilityHint={label}
          editable={editable}
          style={[styles.input, !editable && styles.inputDisabled, style]}
          {...rest}
        />
        {hasRightIcon ? <View style={styles.rightIcon}>{rightIcon}</View> : null}
      </View>
      {hasError ? (
        <Text variant="TEXT_SM" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  wrapper: {
    position: "relative",
    backgroundColor: DS.Colors.LIGHT_GRAY,
    borderRadius: 8,
  },
  wrapperError: {
    borderWidth: 2,
    borderColor: DS.Colors.ERROR,
  },
  input: {
    ...DS.Typography.TEXT,
    paddingVertical: DS.Spacings.LG,
    paddingHorizontal: DS.Spacings.XL,
    height: 48,
  },
  inputDisabled: {
    color: DS.Colors.DISABLED,
  },
  label: {
    fontFamily: "OpenSans-SemiBold",
    textTransform: "uppercase",
    marginBottom: DS.Spacings.SM,
  },
  error: {
    fontFamily: "OpenSans-SemiBold",
    textTransform: "uppercase",
    marginTop: DS.Spacings.SM,
    color: DS.Colors.ERROR,
  },
  rightIcon: {
    position: "absolute",
    top: DS.Spacings.LG,
    right: DS.Spacings.LG,
  },
});

export default Input;
