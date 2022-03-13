import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InitializationGate from "../../components/InitializationGate";
import HomeScreen from "../../screens/HomeScreen";
import ItemScreen from "../../screens/ItemScreen";
import InventoryProvider from "../../state/InventoryContext";
import UserProvider from "../../state/UserContext";

export type MainStackParamList = {
  Home: undefined;
  Item: { productId: string };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <UserProvider>
      <InventoryProvider>
        <InitializationGate>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Item" component={ItemScreen} />
          </Stack.Navigator>
        </InitializationGate>
      </InventoryProvider>
    </UserProvider>
  );
};

export default MainStack;
