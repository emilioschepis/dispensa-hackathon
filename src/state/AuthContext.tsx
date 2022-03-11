import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useReducer } from "react";

import { AsyncStorageKey } from "../config/keys";
import { refreshAccessToken, verifyAccessToken } from "../utils/authUtils";

type State = { state: "authenticated" } | { state: "unauthenticated" } | { state: "loading" };
type Action = { type: "setAuthenticated" } | { type: "setUnauthenticated" };
type Dispatch = (action: Action) => void;

const initialState: State = { state: "loading" };
const Context = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

function reducer(state: State, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function () {
      const accessToken = await AsyncStorage.getItem(AsyncStorageKey.ACCESS_TOKEN);

      if (accessToken && verifyAccessToken(accessToken)) {
        dispatch({ type: "setAuthenticated" });
        return;
      }

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        await AsyncStorage.setItem(AsyncStorageKey.ACCESS_TOKEN, newAccessToken);
        dispatch({ type: "setAuthenticated" });
        return;
      }

      dispatch({ type: "setUnauthenticated" });
    })();
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export function useAuth() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default AuthProvider;
