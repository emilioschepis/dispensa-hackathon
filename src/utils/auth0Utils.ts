import Constants from "expo-constants";

export const Auth0 = {
  CLIENT_ID: Constants.manifest?.extra?.auth0ClientId as string,
  ENDPOINT: Constants.manifest?.extra?.auth0Endpoint as string,
  AUDIENCE: "https://emilioschepis.eu.auth0.com/api/v2/",
  SCOPES: ["openid", "profile", "email", "offline_access"],
};
