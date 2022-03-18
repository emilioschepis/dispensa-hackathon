import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InteractionGate from "../../components/InteractionGate";
import CreateProductScreen from "../../screens/CreateProductScreen";
import HomeScreen from "../../screens/HomeScreen";
import ItemScreen from "../../screens/ItemScreen";
import SearchScreen from "../../screens/SearchScreen";
import UpdateProductScreen from "../../screens/UpdateProductScreen";
import InventoryProvider from "../../state/InventoryContext";
import UserProvider from "../../state/UserContext";
import DS from "../../style/DesignSystem";

export type MainStackParamList = {
  Home: undefined;
  Item: { productId: string; name: string };
  Search: undefined;
  CreateProduct: { name?: string; code?: string };
  UpdateProduct: { productId: string; name: string; code?: string | null };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <UserProvider>
      <InventoryProvider>
        <InteractionGate>
          <Stack.Navigator
            screenOptions={{
              headerTintColor: DS.Colors.PRIMARY,
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontFamily: "Fredoka-SemiBold",
                color: DS.Colors.PRIMARY,
              },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Item" component={ItemScreen} options={({ route }) => ({ title: route.params.name })} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="CreateProduct" component={CreateProductScreen} options={{ title: "Create product" }} />
            <Stack.Screen
              name="UpdateProduct"
              component={UpdateProductScreen}
              options={({ route }) => ({ title: `Updating ${route.params.name}` })}
            />
          </Stack.Navigator>
        </InteractionGate>
      </InventoryProvider>
    </UserProvider>
  );
};

export default MainStack;
