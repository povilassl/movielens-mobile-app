import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SearchStackParamList } from "../../../types";
import {
  exploreByTag,
  exploreByPeople,
} from "../../services/movielensApiService";
import { SearchResult } from "../../interfaces/FrontPageInterfaces";
import { MoviePreview } from "../../components/MoviePreview";

type ExploreScreenRouteProp = RouteProp<SearchStackParamList, "ExploreScreen">;

export const ExploreScreen: React.FC = () => {
  const route = useRoute<ExploreScreenRouteProp>();
  const { type, query } = route.params;

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data =
          type === "tag"
            ? await exploreByTag(query)
            : await exploreByPeople(query);
        setResults(data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [type, query]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.empty}>No movies found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.movieId.toString()}
      numColumns={3}
      contentContainerStyle={styles.list}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.cell}>
          <MoviePreview
            rating={Number(item.movieUserData.prediction.toFixed(1))}
            movie={item.movie}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    color: "#6b7280",
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cell: {
    width: "33.333%",
    paddingHorizontal: 6,
    alignItems: "center",
  },
});
