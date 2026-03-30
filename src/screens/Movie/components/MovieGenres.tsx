import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

type MovieGenresProps = {
  genres: string[];
};

export const MovieGenres: React.FC<MovieGenresProps> = ({ genres }) => {
  if (genres.length === 0) {
    return null;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.genreList}
    >
      {genres.map((genre) => (
        <View key={genre} style={styles.genreChip}>
          <Text style={styles.genreText}>{genre}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  genreList: {
    paddingBottom: 12,
  },
  genreChip: {
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  genreText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#334155",
  },
});
