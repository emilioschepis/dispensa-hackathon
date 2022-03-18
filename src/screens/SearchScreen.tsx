import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import { useQuery } from "urql";

import Input from "../components/core/Input";
import PressableIcon from "../components/core/PressableIcon";
import ErrorPanel from "../components/ErrorPanel";
import Scanner from "../components/Scanner";
import SearchProductsList from "../components/SearchProductsList";
import { ProductsDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";
import DS from "../style/DesignSystem";

export type SearchScreenProps = NativeStackScreenProps<MainStackParamList, "Search">;
type Props = {} & SearchScreenProps;

const SearchScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [status, requestPermission] = BarCodeScanner.usePermissions();
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [{ fetching, error, data }] = useQuery({ query: ProductsDocument });

  const scannerBlocked = !status?.granted && !status?.canAskAgain;

  return (
    <View style={styles.container}>
      {code ? (
        <>
          <Input
            editable={false}
            value={code}
            rightIcon={<PressableIcon name="CANCEL" onPress={() => setCode(null)} />}
          />
        </>
      ) : (
        <Input
          autoFocus
          ref={inputRef}
          value={search}
          onChangeText={setSearch}
          placeholder="What are you looking for?"
          rightIcon={
            <PressableIcon
              disabled={scannerBlocked}
              name="BARCODE"
              onPress={async () => {
                inputRef.current?.blur();

                if (status?.granted) {
                  setScanning(true);
                } else if (status?.canAskAgain) {
                  const newPermission = await requestPermission();
                  if (newPermission.granted) {
                    setScanning(true);
                  }
                }
              }}
            />
          }
        />
      )}
      <View style={styles.contentContainer}>
        {error ? (
          <ErrorPanel error="Could not fetch products." />
        ) : fetching || !data ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.productsContainer}>
            <SearchProductsList search={search} code={code} products={data.products} />
          </View>
        )}
      </View>
      {scanning ? (
        <Scanner
          onBarCodeScanned={(code) => {
            setScanning(false);

            const matches = data?.products.filter((p) => p.code?.toLowerCase() === code.toLowerCase());

            if (matches?.length === 1) {
              navigation.navigate("Item", { productId: matches[0].id, name: matches[0].name });
            } else {
              setCode(code);
              inputRef.current?.focus();
            }
          }}
          onClose={() => {
            setScanning(false);
            inputRef.current?.focus();
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DS.Spacings.XL,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  productsContainer: {
    flex: 1,
  },
  panel: {
    ...DS.Shadows.DEFAULT,
    padding: DS.Spacings.MD,
    backgroundColor: DS.Colors.WHITE,
    borderRadius: 8,
  },
});

export default SearchScreen;
