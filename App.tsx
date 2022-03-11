import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, View } from "react-native";

const auth0ClientId = Constants.manifest?.extra?.auth0ClientId as string;
const auth0Endpoint = Constants.manifest?.extra?.auth0Endpoint as string;

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });

export default function App() {
  const [request, , promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      responseType: "code",
      scopes: ["openid", "profile", "email", "offline_access"],
      extraParams: {
        audience: "https://emilioschepis.eu.auth0.com/api/v2/",
      },
    },
    {
      authorizationEndpoint: `${auth0Endpoint}/authorize`,
    }
  );

  async function authenticate() {
    const response = await promptAsync({ useProxy });

    if (response.type !== "success") {
      if (response.type === "error") {
        throw new Error(response.error?.message);
      } else {
        return;
      }
    }

    const verifier = request!.codeVerifier;
    const code = response.params.code;

    const tokens = await exchangeCodeAsync(
      {
        code,
        clientId: auth0ClientId,
        redirectUri,
        extraParams: {
          grant_type: "authorization_code",
          code_verifier: verifier ?? "",
        },
      },
      { tokenEndpoint: `${auth0Endpoint}/oauth/token` }
    );

    // eslint-disable-next-line no-console
    console.info("Access token:", tokens.accessToken);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button disabled={!request} title="Authenticate" onPress={authenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
