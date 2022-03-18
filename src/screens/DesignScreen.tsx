import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Button from "../components/core/Button";
import Input from "../components/core/Input";
import PressableIcon from "../components/core/PressableIcon";
import Stepper from "../components/core/Stepper";
import Text from "../components/core/Text";
import { DevStackParamList } from "../navigation/navigators/DevStack";
import DS from "../style/DesignSystem";

export type DesignScreenProps = NativeStackScreenProps<DevStackParamList, "Design">;
type Props = {} & DesignScreenProps;

const DesignElement = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <View style={styles.element}>
      <Text variant="H2" style={styles.elementTitle}>
        {title}
      </Text>
      <View style={styles.elementWrapper}>{children}</View>
    </View>
  );
};

const DesignScreen = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <DesignElement title="Button (primary)">
        <Button title="Button" />
      </DesignElement>
      <DesignElement title="Button (primary, disabled)">
        <Button title="Button" disabled />
      </DesignElement>
      <DesignElement title="Button (secondary)">
        <Button title="Button" variant="SECONDARY" />
      </DesignElement>
      <DesignElement title="Button (secondary, disabled)">
        <Button title="Button" variant="SECONDARY" disabled />
      </DesignElement>
      <DesignElement title="Input (empty)">
        <Input placeholder="Placeholder" />
      </DesignElement>
      <DesignElement title="Input (with value)">
        <Input value="Some text" />
      </DesignElement>
      <DesignElement title="Input (with label)">
        <Input placeholder="Placeholder" label="Label" />
      </DesignElement>
      <DesignElement title="Input (with error)">
        <Input placeholder="Placeholder" error="There is an error" />
      </DesignElement>
      <DesignElement title="Input (with right icon)">
        <Input placeholder="Placeholder" rightIcon={<PressableIcon name="BARCODE" />} />
      </DesignElement>
      <DesignElement title="Stepper">
        <Stepper value={0} onIncrease={() => {}} onDecrease={() => {}} />
      </DesignElement>
      <DesignElement title="Stepper (with limit)">
        <Stepper value={0} min={0} onIncrease={() => {}} onDecrease={() => {}} />
      </DesignElement>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: DS.Spacings.LG,
  },
  element: {
    marginBottom: DS.Spacings.MD,
  },
  elementTitle: {
    marginBottom: DS.Spacings.MD,
  },
  elementWrapper: {
    borderWidth: 4,
    borderColor: DS.Colors.GRAY,
    borderStyle: "dotted",
    padding: DS.Spacings.LG,
  },
});

export default DesignScreen;
