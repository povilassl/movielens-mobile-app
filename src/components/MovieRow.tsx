import { FlatList, View, Text, StyleSheet } from "react-native";
import { SearchResult } from "../interfaces/FrontPageInterfaces";
import React from "react";
import { MoviePreview } from "./MoviePreview";

export const MovieRow: React.FC<{
  title: string;
  searchResults: SearchResult[];
}> = ({ title, searchResults }) => {
  return (
    <View style={styles.movieSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={searchResults}
        horizontal
        contentContainerStyle={styles.rowContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          const displayRating = Number(
            item.movieUserData.prediction.toFixed(1),
          );

          return (
            <View style={styles.movieCell}>
              <MoviePreview rating={displayRating} movie={item.movie} />
            </View>
          );
        }}
        keyExtractor={(item) => item.movieId.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rowContent: {
    paddingRight: 10,
  },
  separator: {
    width: 10,
  },
  movieCell: {
    width: 120,
  },
});
