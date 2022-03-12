import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";

import { RootStackParamList } from "../navigation/navigators/RootStack";

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const HomeScreen = ({}: Props) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
