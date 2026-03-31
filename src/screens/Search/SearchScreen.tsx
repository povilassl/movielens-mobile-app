import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SearchScreenNavigationProp } from "../../../types";
import { SearchResultCard } from "./components/SearchResultCard";
import {
  OmniSearchResult,
  getMovieDetailsById,
  searchMovies,
} from "../../services/movielensApiService";

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [omniResults, setOmniResults] = useState<OmniSearchResult>({
    movies: [],
    people: [],
    tags: [],
  });

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setOmniResults({ movies: [], people: [], tags: [] });
      setIsLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const response = await searchMovies(trimmedQuery);
      setOmniResults(response);
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleMoviePress = async (movieId: number) => {
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

  const handleTagPress = async (tag: string) => {
    navigation.navigate("ExploreScreen", {
      title: tag,
      type: "tag",
      query: tag,
    });
  };

  const handlePersonPress = async (person: string) => {
    navigation.navigate("ExploreScreen", {
      title: person,
      type: "people",
      query: person,
    });
  };

  const hasNoOmniResults =
    Boolean(query.trim()) &&
    !isLoading &&
    omniResults.movies.length === 0 &&
    omniResults.people.length === 0 &&
    omniResults.tags.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputShell}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search movies, people, tags..."
          placeholderTextColor="#9ca3af"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable
            accessibilityLabel="Clear search"
            hitSlop={8}
            onPress={() => setQuery("")}
            style={({ pressed }) => [
              styles.clearButton,
              pressed && styles.clearButtonPressed,
            ]}
          >
            <Text style={styles.clearButtonText}>×</Text>
          </Pressable>
        )}
      </View>

      {isLoading && (
        <View style={styles.statusRow}>
          <ActivityIndicator size="small" color="#111827" />
          <Text style={styles.statusText}>Searching...</Text>
        </View>
      )}

      {hasNoOmniResults && (
        <Text style={styles.emptyState}>No results found.</Text>
      )}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.resultList}
      >
        {omniResults.movies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Movies</Text>
            {omniResults.movies.map((item) => (
              <SearchResultCard
                key={item.movieId.toString()}
                label={item.label}
                onPress={() => handleMoviePress(item.movieId)}
              />
            ))}
          </View>
        )}

        {omniResults.people.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>People</Text>
            {omniResults.people.map((item) => (
              <SearchResultCard
                key={item.name}
                label={item.name}
                onPress={() => handlePersonPress(item.name)}
              />
            ))}
          </View>
        )}

        {omniResults.tags.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Tags</Text>
            {omniResults.tags.map((item) => (
              <SearchResultCard
                key={item.tag}
                label={item.tag}
                onPress={() => handleTagPress(item.tag)}
              />
            ))}
          </View>
        )}
      </ScrollView>
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
  inputShell: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 14,
    backgroundColor: "#f9fafb",
    paddingLeft: 14,
    paddingRight: 10,
    minHeight: 52,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonPressed: {
    backgroundColor: "#d1d5db",
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 18,
  },
  statusRow: {
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
  section: {
    gap: 8,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});
