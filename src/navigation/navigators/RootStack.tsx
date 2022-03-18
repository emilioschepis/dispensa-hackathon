import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../../screens/AuthScreen";
import { useAuth } from "../../state/AuthContext";
import DevStack from "./DevStack";
import MainStack, { MainStackParamList } from "./MainStack";

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
  Auth: undefined;
  Dev: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const auth = useAuth();

  if (auth.state.state === "loading") {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.state.state === "authenticated" ? (
        <>
          <Stack.Screen name="Main" component={MainStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </>
      )}
      {__DEV__ && (
        <>
          <Stack.Screen name="Dev" component={DevStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
