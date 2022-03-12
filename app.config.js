import "dotenv/config";

export default {
  expo: {
    name: "dispensa",
    slug: "dispensa",
    version: "1.0.0",
    scheme: "dispensa",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      auth0ClientId: process.env.PUBLIC_AUTH0_CLIENT_ID,
      auth0Endpoint: process.env.PUBLIC_AUTH0_ENDPOINT,
      hasuraEndpoint: process.env.PUBLIC_HASURA_ENDPOINT,
    },
  },
};
