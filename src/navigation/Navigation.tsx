import { NavigationContainer } from "@react-navigation/native";

import AppTheme from "../style/AppTheme";
import RootStack, { RootStackParamList } from "./navigators/RootStack";

const Navigation = () => {
  return (
    <NavigationContainer theme={AppTheme}>
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
