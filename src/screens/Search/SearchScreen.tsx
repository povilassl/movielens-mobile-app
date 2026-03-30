import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SearchScreenNavigationProp } from "../../../types";
import { SearchResultCard } from "./components/SearchResultCard";
import {
  getMovieDetailsById,
  searchMovies,
} from "../../services/movielensApiService";

type SearchResultItem = {
  movieId: number;
  label: string;
};

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const response = await searchMovies(trimmedQuery);
      setResults(response);
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultPress = async (movieId: number) => {
    const movieDetails = await getMovieDetailsById(movieId);

    if (!movieDetails) {
      Alert.alert("Unable to open movie", "Could not load movie details.");
      return;
    }

    navigation.navigate("MovieScreen", {
      movie: movieDetails.movie,
      prediction: movieDetails.prediction,
    });
  };

  const showEmptyState =
    Boolean(query.trim()) && !isLoading && results.length === 0;

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search movies..."
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      {isLoading && (
        <View style={styles.statusRow}>
          <ActivityIndicator size="small" color="#111827" />
          <Text style={styles.statusText}>Searching...</Text>
        </View>
      )}

      {showEmptyState && (
        <Text style={styles.emptyState}>No movie matches found.</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.movieId.toString()}
        contentContainerStyle={styles.resultList}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <SearchResultCard
            label={item.label}
            onPress={() => handleResultPress(item.movieId)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  statusRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusText: {
    color: "#6b7280",
    fontSize: 14,
  },
  emptyState: {
    marginTop: 12,
    color: "#6b7280",
    fontSize: 14,
  },
  resultList: {
    paddingTop: 14,
    paddingBottom: 24,
    gap: 10,
  },
});
