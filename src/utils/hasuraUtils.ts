import Constants from "expo-constants";

export const Hasura = {
  ENDPOINT: Constants.manifest?.extra?.hasuraEndpoint as string,
};
