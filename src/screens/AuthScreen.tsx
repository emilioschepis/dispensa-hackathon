import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import CompositionIllustration from "../../assets/illustrations/composition.svg";
import AuthenticationButton from "../components/AuthenticationButton";
import Spacer from "../components/core/Spacer";
import Text from "../components/core/Text";
import { RootStackParamList } from "../navigation/navigators/RootStack";
import DS from "../style/DesignSystem";

export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, "Auth">;
type Props = {} & AuthScreenProps;

const AuthScreen = ({}: Props) => {
  const dimensions = useWindowDimensions();

  return (
    <View style={styles.container}>
      <CompositionIllustration width={dimensions.width * 0.75} height={dimensions.width * 0.75} />
      <Text variant="H1">
        Welcome to <Text variant="H1">Dispensa</Text>!
      </Text>
      <Spacer height={DS.Spacings.LG} />
      <Text variant="TEXT_LG" style={styles.subtitle}>
        Track the items in your pantry and never run out again!
      </Text>
      <Spacer height={DS.Spacings.XL} />
      <AuthenticationButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: DS.Spacings.LG,
  },
  subtitle: {
    textAlign: "center",
  },
});

export default AuthScreen;
