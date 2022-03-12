import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/AuthScreen";
import CreateProductScreen from "../../screens/CreateProductScreen";
import HomeScreen from "../../screens/HomeScreen";
import ProductsScreen from "../../screens/ProductsScreen";
import { useAuth } from "../../state/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Products: undefined;
  CreateProduct: undefined;
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
