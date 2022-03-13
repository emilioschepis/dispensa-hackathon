import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InitializationGate from "../../components/InitializationGate";
import HomeScreen from "../../screens/HomeScreen";
import ItemScreen from "../../screens/ItemScreen";
import SearchScreen from "../../screens/SearchScreen";
import InventoryProvider from "../../state/InventoryContext";
import UserProvider from "../../state/UserContext";

export type MainStackParamList = {
  Home: undefined;
  Item: { productId: string };
  Search: undefined;
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
            <Stack.Screen name="Search" component={SearchScreen} />
          </Stack.Navigator>
        </InitializationGate>
      </InventoryProvider>
    </UserProvider>
  );
};

export default MainStack;
