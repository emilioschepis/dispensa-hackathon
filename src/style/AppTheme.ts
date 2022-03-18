import { DefaultTheme, Theme } from "@react-navigation/native";

import DS from "./DesignSystem";

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: DS.Colors.PRIMARY,
    background: DS.Colors.WHITE,
  },
};

export default AppTheme;
