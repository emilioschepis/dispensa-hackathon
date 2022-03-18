import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";

const InitializationGate = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "Fredoka-Regular": require("../../assets/fonts/fredoka/Fredoka-Regular.ttf"),
    "Fredoka-SemiBold": require("../../assets/fonts/fredoka/Fredoka-SemiBold.ttf"),
    "OpenSans-Regular": require("../../assets/fonts/opensans/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("../../assets/fonts/opensans/OpenSans-SemiBold.ttf"),
  });

  useEffect(() => {
    let mounted = true;
    (async function () {})().then(() => {
      if (mounted) {
        setReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready || !fontsLoaded) {
    return <AppLoading />;
  }

  return <>{children}</>;
};

export default InitializationGate;
