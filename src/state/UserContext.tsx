import React, { useContext, useEffect, useReducer } from "react";

import { UsersDocument } from "../generated/graphql";
import client from "../graphql/client";

type State = { state: "loaded"; data: { id: string; username: string } } | { state: "loading" };
type Action = { type: "setLoaded"; payload: { id: string; username: string } };
type Dispatch = (action: Action) => void;

const initialState: State = { state: "loading" };
const Context = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setLoaded":
      return { state: "loaded", data: { id: action.payload.id, username: action.payload.username } };
    default:
      return state;
  }
}

const UserProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let mounted = true;

    (async function () {
      const response = await client.query(UsersDocument).toPromise();
      if (response.data?.users?.[0] && mounted) {
        dispatch({
          type: "setLoaded",
          payload: {
            id: response.data.users[0].id,
            username: response.data.users[0].username,
          },
        });
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export function useUser() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }

  return context;
}

export function useUserId(): string {
  const user = useUser();

  if (user.state.state !== "loaded") {
    throw new Error("Attempting to read user id while still loading");
  }

  return user.state.data.id;
}

export function useUserData() {
  const user = useUser();

  if (user.state.state !== "loaded") {
    throw new Error("Attempting to read user data while still loading");
  }

  return user.state.data;
}

export default UserProvider;
