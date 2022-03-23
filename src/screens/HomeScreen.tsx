import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "urql";

import Shopping from "../../assets/illustrations/shopping.svg";
import Fab from "../components/core/Fab";
import Text from "../components/core/Text";
import ErrorPanel from "../components/ErrorPanel";
import InventoryItemsList from "../components/InventoryItemsList";
import { ItemsInInventoryDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import { useInventoryId } from "../state/InventoryContext";
import { useUserData } from "../state/UserContext";
import DS from "../style/DesignSystem";

export type HomeScreenProps = NativeStackScreenProps<MainStackParamList, "Home">;
type Props = {} & HomeScreenProps;

const HomeScreen = ({ navigation }: Props) => {
  const width = useWindowDimensions().width;
  const inventoryId = useInventoryId();
  const username = useUserData().username;

  // When the network request returns an empty list, it does not have a __typename, so cache invalidation does not work
  // https://formidable.com/open-source/urql/docs/basics/document-caching/#adding-typenames
  const context = useMemo(() => ({ additionalTypenames: ["products"] }), []);
  const [{ fetching, error, data }] = useQuery({
    query: ItemsInInventoryDocument,
    variables: { inventoryId },
    context,
  });

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.greeting}>
            <Text variant="H0">
              Hello,{" "}
              <Text variant="H0" style={styles.username}>
                {username}
              </Text>
            </Text>
          </View>
          <View style={styles.illustration}>
            <Shopping width={width * 0.3} />
          </View>
        </View>
        <View style={styles.panel}>
          {error ? (
            <ErrorPanel error="Oops, something went wrong while loading your inventory." />
          ) : fetching || !data ? (
            <ActivityIndicator />
          ) : (
            <>
              <InventoryItemsList items={data.products} />
              {data.products.length > 0 ? (
                <View style={{ position: "absolute", bottom: DS.Spacings.XXL, right: DS.Spacings.XXL, zIndex: 2 }}>
                  <Fab icon="SEARCH" onPress={() => navigation.navigate("Search")} />
                </View>
              ) : null}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DS.Colors.BACKGROUND,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    left: 0,
    right: 0,
    zIndex: -1,
    paddingLeft: DS.Spacings.XL,
  },
  greeting: {
    flex: 1,
  },
  username: {
    color: DS.Colors.PRIMARY,
  },
  illustration: {},
  panel: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: DS.Colors.ERROR,
    textAlign: "center",
  },
});

export default HomeScreen;
