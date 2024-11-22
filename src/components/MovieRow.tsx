import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SearchResult } from "../interfaces/FronPageInterfaces";
import { getMoviePoster } from "../services/movielensApiService";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

export const MovieRow: React.FC<{
  title: string;
  searchResults: SearchResult[];
}> = ({ title, searchResults }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.movieSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={searchResults}
        horizontal
        renderItem={({ item }) => {
          const userPrediction =
            item.movieUserData?.predictionDetails?.components?.find(
              (component) => component.type === "USER"
            )?.pred;

          const fallbackPrediction =
            item.movieUserData?.predictionDetails?.components?.find(
              (component) => component.type === "FALLBACK"
            )?.pred;

          const displayRating = Number(
            (userPrediction ?? fallbackPrediction ?? 0).toFixed(1)
          );

          return (
            <TouchableOpacity
              style={styles.movieCard}
              onPress={() =>
                navigation.navigate("MovieScreen", { movie: item.movie })
              }
            >
              <Image
                source={{ uri: getMoviePoster(item.movie.posterPath) }}
                style={styles.movieImage}
              />
              <Text style={styles.movieTitle}>{item.movie.title}</Text>
              {displayRating !== 0 && (
                <View style={styles.ratingContainer}>
                  <Text style={styles.movieRating}>{displayRating}</Text>
                  <FontAwesomeIcon icon={faStar} size={12} />
                </View>
              )}
            </TouchableOpacity>
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
  movieCard: {
    width: 120,
    marginRight: 10,
    alignItems: "center",
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  movieRating: {
    textAlign: "center",
    fontSize: 14,
    marginRight: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
