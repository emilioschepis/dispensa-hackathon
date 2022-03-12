import { StatusBar } from "expo-status-bar";

import Navigation from "./src/navigation/Navigation";
import AuthProvider from "./src/state/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <Navigation />
    </AuthProvider>
  );
}
