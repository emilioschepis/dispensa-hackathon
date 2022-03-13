import { NavigationContainer } from "@react-navigation/native";

import RootStack, { RootStackParamList } from "./navigators/RootStack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default Navigation;
