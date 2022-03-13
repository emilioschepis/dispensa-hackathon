import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";
import { useUserData } from "../state/UserContext";

export type HomeScreenProps = NativeStackScreenProps<MainStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const HomeScreen = ({ navigation }: Props) => {
  const username = useUserData().username;
  const inventoryId = useInventoryId();

  return (
    <View style={styles.container}>
      <Text>
        Hi {username}, your inventory id is{"\n"}
        {inventoryId}
      </Text>
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

export default HomeScreen;
