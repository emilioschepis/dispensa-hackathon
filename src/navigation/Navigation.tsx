import { NavigationContainer } from "@react-navigation/native";

import RootStack from "./navigators/RootStack";

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigation;
