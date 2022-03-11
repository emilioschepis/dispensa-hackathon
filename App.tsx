import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import AuthenticationButton from "./src/components/AuthenticationButton";
import AuthProvider from "./src/state/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <AuthenticationButton />
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
