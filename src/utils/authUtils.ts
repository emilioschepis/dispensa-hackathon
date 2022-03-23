import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import * as AuthSession from "expo-auth-session";
import * as SecureStorage from "expo-secure-store";

import { AsyncStorageKey } from "../config/keys";
import { Auth0 } from "./auth0Utils";
import { getJwtPayload } from "./jwtUtils";

export async function getAccessToken(): Promise<string | null> {
  try {
    return AsyncStorage.getItem(AsyncStorageKey.ACCESS_TOKEN);
  } catch (error) {
    return null;
  }
}

export function verifyAccessToken(token: string): boolean {
  const payload = getJwtPayload(token);

  if (!payload) return false;
  if (!payload.exp) return false;
  if (typeof payload.exp !== "number") return false;

  const expiration = dayjs(payload.exp * 1000);

  return expiration.isValid() && expiration.isAfter(dayjs());
}

export async function refreshAccessToken(): Promise<string | null> {
  const available = await SecureStorage.isAvailableAsync();
  if (!available) return null;

  const refreshToken = await SecureStorage.getItemAsync(AsyncStorageKey.REFRESH_TOKEN);
  if (!refreshToken) return null;

  try {
    const tokens = await AuthSession.refreshAsync(
      {
        refreshToken,
        clientId: Auth0.CLIENT_ID,
        scopes: Auth0.SCOPES,
      },
      {
        tokenEndpoint: Auth0.ENDPOINT + "/oauth/token",
      }
    );

    if (tokens.refreshToken) {
      await SecureStorage.setItemAsync(AsyncStorageKey.REFRESH_TOKEN, tokens.refreshToken);
    }

    return tokens.accessToken;
  } catch (error) {
    await removeRefreshToken();
    return null;
  }
}

/**
 * Saves the user's refresh token in the secure storage.
 *
 * @param token - The refresh token to save
 * @returns true if the token is saved successfully
 */
export async function saveAccessToken(token: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(AsyncStorageKey.ACCESS_TOKEN, token);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Saves the user's refresh token in the secure storage.
 *
 * @param token - The refresh token to save
 * @returns true if the token is saved successfully
 */
export async function saveRefreshToken(token: string): Promise<boolean> {
  try {
    await SecureStorage.setItemAsync(AsyncStorageKey.REFRESH_TOKEN, token);
    return true;
  } catch (error) {
    return false;
  }
}

export async function removeRefreshToken(): Promise<boolean> {
  try {
    await SecureStorage.deleteItemAsync(AsyncStorageKey.REFRESH_TOKEN);
    return true;
  } catch (error) {
    return false;
  }
}
