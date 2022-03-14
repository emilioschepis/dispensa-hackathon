import "dotenv/config";

export default {
  /**
   * @type {import('@expo/config').ExpoConfig}
   */
  expo: {
    name: "Dispensa",
    slug: "dispensa",
    owner: "emilioschepis",
    version: process.env.npm_package_version,
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
      infoPlist: {
        NSCameraUsageDescription: "We use the camera to allow you to scan product barcodes",
      },
      bundleIdentifier: "com.emilioschepis.dispensa",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: ["CAMERA"],
      package: "com.emilioschepis.dispensa",
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
