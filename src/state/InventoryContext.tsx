import React, { useContext, useEffect, useReducer } from "react";
import { useQuery } from "urql";

import { CreateInventoryDocument, InventoriesDocument } from "../generated/graphql";
import client from "../graphql/client";
import { useUser } from "./UserContext";

type State = { state: "loaded"; id: string } | { state: "creating" } | { state: "loading" };
type Action = { type: "setCreating" } | { type: "setLoaded"; payload: { id: string } };
type Dispatch = (action: Action) => void;

const initialState: State = { state: "loading" };
const Context = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setCreating":
      return { state: "creating" };
    case "setLoaded":
      return { state: "loaded", id: action.payload.id };
    default:
      return state;
  }
}

const InventoryProvider: React.FC = ({ children }) => {
  const user = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [{ data, fetching, error }] = useQuery({ query: InventoriesDocument });

  useEffect(() => {
    let mounted = true;

    if (user.state.state === "loading") return;
    if (error) return;
    if (fetching) return;
    if (!data?.inventories) return;

    if (data.inventories.length > 0) {
      // The user already has an inventory.
      dispatch({ type: "setLoaded", payload: { id: data.inventories[0].id } });
      return;
    }

    // The user does not have an inventory yet. Create one now.
    dispatch({ type: "setCreating" });
    (async function () {
      const created = await client.mutation(CreateInventoryDocument).toPromise();
      if (created.data?.insert_inventories_one?.id && mounted) {
        dispatch({ type: "setLoaded", payload: { id: created.data.insert_inventories_one.id } });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [user, error, fetching, data]);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export function useInventory() {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }

  return context;
}

export function useInventoryId(): string {
  const inventory = useInventory();

  if (inventory.state.state !== "loaded") {
    throw new Error("Attempting to read inventory id while still loading");
  }

  return inventory.state.id;
}

export default InventoryProvider;
