import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import AuthenticationButton from "../components/AuthenticationButton";
import { RootStackParamList } from "../navigation/navigators/RootStack";

export type AuthScreenProps = NativeStackScreenProps<RootStackParamList, "Auth">;
type Props = {} & AuthScreenProps;

const AuthScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
      <AuthenticationButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;
