import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery } from "urql";

import Scanner from "../components/Scanner";
import SearchProductsList from "../components/SearchProductsList";
import { ProductsDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";

export type SearchScreenProps = NativeStackScreenProps<MainStackParamList, "Search">;
type Props = {} & SearchScreenProps;

const SearchScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const [code, setCode] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [{ fetching, error, data }] = useQuery({ query: ProductsDocument });

  return (
    <View style={styles.container}>
      {code ? (
        <>
          <TextInput value={code} editable={false} style={styles.input} />
          <Button
            title="Remove"
            onPress={() => {
              setCode(null);
            }}
          />
        </>
      ) : (
        <>
          <TextInput
            ref={inputRef}
            autoFocus
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            style={styles.input}
          />
          <Button
            title="Scan"
            onPress={() => {
              inputRef.current?.blur();
              setScanning(true);
            }}
          />
        </>
      )}
      {error ? (
        <Text>Could not fetch products.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <SearchProductsList search={search} code={code} products={data.products} />
      )}
      {scanning ? (
        <Scanner
          onBarCodeScanned={(data) => {
            setCode(data);
            setScanning(false);
            inputRef.current?.focus();
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
    padding: 16,
  },
  input: {
    padding: 16,
    backgroundColor: "white",
  },
});

export default SearchScreen;
