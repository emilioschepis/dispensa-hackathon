import { TextStyle } from "react-native";

const Colors = {
  PRIMARY: "#0EAD69",
  PRIMARY_LIGHT: "#63D4A5",
  PRIMARY_DARK: "#1C744F",
  BLACK: "#1E1E1E",
  WHITE: "#FAFAFA",
  BACKGROUND: "#EFEFEF",
  GRAY: "#C9C9C9",
  LIGHT_GRAY: "#ECECEC",
  DARK_GRAY: "#8C8C8C",
  ERROR: "#F25757",
  DESTRUCTIVE: "#F25757",
  DISABLED: "#C9C9C9",
};

export type TypographyType = "H0" | "H1" | "H2" | "H3" | "H4" | "H5" | "TEXT_LG" | "TEXT" | "TEXT_SM" | "TEXT_XS";

const Typography: Record<TypographyType, TextStyle> = {
  H0: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 32,
    lineHeight: 40,
  },
  H1: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 24,
    lineHeight: 32,
  },
  H2: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 18,
    lineHeight: 24,
  },
  H3: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },
  H4: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 14,
    lineHeight: 24,
  },
  H5: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 12,
    lineHeight: 24,
  },
  TEXT_LG: {
    fontFamily: "OpenSans-Regular",
    fontSize: 18,
    lineHeight: 24,
  },
  TEXT: {
    fontFamily: "OpenSans-Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  TEXT_SM: {
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  TEXT_XS: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    lineHeight: 16,
  },
};

const Spacings = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 24,
};

const Shadows = {
  DEFAULT: {
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  STRONG: {
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowColor: Colors.BLACK,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 5,
  },
};

const DS = { Colors, Typography, Spacings, Shadows };

export default DS;
