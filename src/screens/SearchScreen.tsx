import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from "react-native";
import { useQuery } from "urql";

import SearchProductsList from "../components/SearchProductsList";
import { ProductsDocument } from "../generated/graphql";
import { MainStackParamList } from "../navigation/navigators/MainStack";

export type SearchScreenProps = NativeStackScreenProps<MainStackParamList, "Search">;
type Props = {} & SearchScreenProps;

const SearchScreen = ({ navigation }: Props) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef<TextInput>(null);
  const [{ fetching, error, data }] = useQuery({ query: ProductsDocument });

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput ref={searchRef} value={search} onChangeText={setSearch} placeholder="Search" style={styles.input} />
      {error ? (
        <Text>Could not fetch products.</Text>
      ) : fetching || !data ? (
        <ActivityIndicator />
      ) : (
        <SearchProductsList search={search} products={data.products} />
      )}
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
