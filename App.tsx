import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { Button, Platform, StyleSheet, View } from "react-native";

import AuthProvider from "./src/state/AuthContext";
import { Auth0 } from "./src/utils/auth0Utils";
import { saveAccessToken, saveRefreshToken } from "./src/utils/authUtils";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });

export default function App() {
  const [request, , promptAsync] = useAuthRequest(
    {
      redirectUri,
      clientId: Auth0.CLIENT_ID,
      responseType: "code",
      scopes: Auth0.SCOPES,
      extraParams: {
        audience: Auth0.AUDIENCE,
      },
    },
    {
      authorizationEndpoint: Auth0.ENDPOINT + "/authorize",
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
        clientId: Auth0.CLIENT_ID,
        redirectUri,
        extraParams: {
          grant_type: "authorization_code",
          code_verifier: verifier ?? "",
        },
      },
      { tokenEndpoint: Auth0.ENDPOINT + "/oauth/token" }
    );

    await saveAccessToken(tokens.accessToken);
    await saveRefreshToken(tokens.refreshToken!);
  }

  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Button disabled={!request} title="Authenticate" onPress={authenticate} />
      </View>
    </AuthProvider>
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
