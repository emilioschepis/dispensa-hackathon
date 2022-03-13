import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, Platform } from "react-native";

import { useAuth } from "../state/AuthContext";
import { Auth0 } from "../utils/auth0Utils";
import { saveAccessToken, saveRefreshToken } from "../utils/authUtils";

type Props = {};

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = makeRedirectUri({ useProxy });

const AuthenticationButton = ({}: Props) => {
  const { dispatch } = useAuth();
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

    dispatch({ type: "setAuthenticated" });
  }

  return <Button disabled={!request} title="Login" onPress={authenticate} />;
};

export default AuthenticationButton;
