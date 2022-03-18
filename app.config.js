import "dotenv/config";

function makeVersionNumber(packageVersion) {
  const parts = packageVersion.split(".");
  return parts[2] + parts[1] * 1000 + parts[0] * 1000000;
}

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
      backgroundColor: "#0EAD69",
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
      buildNumber: makeVersionNumber(process.env.npm_package_version),
      bundleIdentifier: "com.emilioschepis.dispensa",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#0EAD69",
      },
      permissions: ["CAMERA"],
      package: "com.emilioschepis.dispensa",
      versionCode: makeVersionNumber(process.env.npm_package_version),
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
