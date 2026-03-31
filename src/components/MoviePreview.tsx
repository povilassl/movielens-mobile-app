import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../interfaces/FrontPageInterfaces";
import { getMoviePoster } from "../services/movielensApiService";
import { ScreenNavigationProp } from "../../types";

type Props = {
  rating: number;
  movie: Movie;
};

export const MoviePreview: React.FC<Props> = ({ rating, movie }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [hasImageError, setHasImageError] = useState(false);

  const posterUrl = movie.posterPath ? getMoviePoster(movie.posterPath) : "";
  const shouldShowPoster = Boolean(posterUrl) && !hasImageError;

  return (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() =>
        navigation.navigate("MovieScreen", {
          movie: movie,
          prediction: rating !== 0 ? rating : undefined,
        })
      }
    >
      {shouldShowPoster ? (
        <Image
          source={{ uri: posterUrl }}
          style={styles.movieImage}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <View style={styles.posterFallback}>
          <Text style={styles.posterFallbackText}>No poster</Text>
        </View>
      )}
      <Text style={styles.movieTitle}>{movie.title}</Text>
      {rating !== 0 && (
        <View style={styles.ratingContainer}>
          <Text style={styles.movieRating}>{rating}</Text>
          <FontAwesomeIcon icon={faStar} size={12} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    width: "100%",
    maxWidth: 120,
    alignItems: "center",
  },
  movieImage: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 5,
  },
  posterFallback: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  posterFallbackText: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
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
