import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  View,
  TouchableOpacity,
} from "react-native";
import { MovieScreenRouteProp } from "../../types";
import {
  getImdbReference,
  getMoviePoster,
  getYoutubeReference,
} from "../services/movielensApiService";

export const MovieScreen: React.FC = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movie } = route.params;

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image
        source={{ uri: getMoviePoster(movie.posterPath) }}
        style={styles.poster}
      />
      <Text style={styles.plot}>{movie.plotSummary}</Text>
      <Text style={styles.info}>Runtime: {movie.runtime} mins</Text>
      <Text style={styles.info}>Release Date: {movie.releaseDate}</Text>
      <Text style={styles.info}>Languages: {movie.languages.join(", ")}</Text>
      <Text style={styles.info}>Directors: {movie.directors.join(", ")}</Text>
      {/* <Text style={styles.info}>Actors: {movie.actors.join(", ")}</Text> */}

      <View style={styles.iconContainer}>
        {/* IMDb Icon */}
        <TouchableOpacity
          onPress={() => openLink(getImdbReference(movie.imdbMovieId))}
          style={styles.icon}
        >
          <Icon name="imdb" size={40} color="#f5c518" />
        </TouchableOpacity>

        {/* YouTube Icon */}
        {movie.youtubeTrailerIds.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              openLink(getYoutubeReference(movie.youtubeTrailerIds[0]))
            }
            style={styles.icon}
          >
            <Icon name="youtube-play" size={40} color="#FF0000" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  poster: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  plot: {
    fontSize: 16,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  icon: {
    alignItems: "center",
  },
});
