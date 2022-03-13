import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InitializationGate from "../../components/InitializationGate";
import CreateProductScreen from "../../screens/CreateProductScreen";
import HomeScreen from "../../screens/HomeScreen";
import ItemScreen from "../../screens/ItemScreen";
import SearchScreen from "../../screens/SearchScreen";
import UpdateProductScreen from "../../screens/UpdateProductScreen";
import InventoryProvider from "../../state/InventoryContext";
import UserProvider from "../../state/UserContext";

export type MainStackParamList = {
  Home: undefined;
  Item: { productId: string };
  Search: undefined;
  CreateProduct: { name?: string; code?: string };
  UpdateProduct: { productId: string; name: string; code?: string | null };
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
            <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
            <Stack.Screen name="UpdateProduct" component={UpdateProductScreen} />
          </Stack.Navigator>
        </InitializationGate>
      </InventoryProvider>
    </UserProvider>
  );
};

export default MainStack;
