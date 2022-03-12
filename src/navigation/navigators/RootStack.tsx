import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/AuthScreen";
import CreateProductScreen from "../../screens/CreateProductScreen";
import HomeScreen from "../../screens/HomeScreen";
import InventoryItemScreen from "../../screens/InventoryItemScreen";
import InventoryScreen from "../../screens/InventoryScreen";
import ProductsScreen from "../../screens/ProductsScreen";
import ScannerScreen from "../../screens/ScannerScreen";
import UpdateProductScreen from "../../screens/UpdateProductScreen";
import { useAuth } from "../../state/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Products: undefined;
  CreateProduct?: { code?: string };
  UpdateProduct: { id: string; code?: string };
  Scanner: { source: { screen: "CreateProduct" } | { screen: "UpdateProduct"; id: string } };
  Inventory: undefined;
  InventoryItem: { inventoryId: string; productId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const auth = useAuth();

  if (auth.state.state === "loading") {
    return null;
  }

  return (
    <Stack.Navigator>
      {auth.state.state === "authenticated" ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Products" component={ProductsScreen} />
          <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
          <Stack.Screen name="UpdateProduct" component={UpdateProductScreen} />
          <Stack.Screen name="Scanner" component={ScannerScreen} />
          <Stack.Screen name="Inventory" component={InventoryScreen} />
          <Stack.Screen name="InventoryItem" component={InventoryItemScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
