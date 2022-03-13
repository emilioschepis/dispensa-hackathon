import React from "react";

import { useInventory } from "../state/InventoryContext";
import { useUser } from "../state/UserContext";

const InitializationGate = ({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) => {
  const user = useUser();
  const inventory = useInventory();

  return <>{user.state.state === "loaded" && inventory.state.state === "loaded" ? children : fallback ?? <></>}</>;
};

export default InitializationGate;
