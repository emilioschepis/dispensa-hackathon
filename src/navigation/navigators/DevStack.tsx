import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DesignScreen from "../../screens/DesignScreen";

export type DevStackParamList = {
  Design: undefined;
};

const Stack = createNativeStackNavigator<DevStackParamList>();

const DevStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Design" component={DesignScreen} />
    </Stack.Navigator>
  );
};

export default DevStack;
