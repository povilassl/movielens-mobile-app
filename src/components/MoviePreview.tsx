import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../interfaces/FronPageInterfaces";
import { getMoviePoster } from "../services/movielensApiService";

type Props = {
  rating: number;
  movie: Movie;
};

export const MoviePreview: React.FC<Props> = ({ rating, movie }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.movieCard}
      onPress={() => navigation.navigate("MovieScreen", { movie: movie })}
    >
      <Image
        source={{ uri: getMoviePoster(movie.posterPath) }}
        style={styles.movieImage}
      />
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
