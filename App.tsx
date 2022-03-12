import { StatusBar } from "expo-status-bar";
import { Provider as GraphQLProvider } from "urql";

import client from "./src/graphql/client";
import Navigation from "./src/navigation/Navigation";
import AuthProvider from "./src/state/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <GraphQLProvider value={client}>
        <StatusBar style="auto" />
        <Navigation />
      </GraphQLProvider>
    </AuthProvider>
  );
}
