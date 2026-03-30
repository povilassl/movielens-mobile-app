import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, ScrollView, Linking } from "react-native";
import { MovieScreenRouteProp } from "../../../types";
import { MovieActions } from "./components/MovieActions";
import { MovieDetailsSection } from "./components/MovieDetailsSection";
import { MovieGenres } from "./components/MovieGenres";
import { MovieHeader } from "./components/MovieHeader";
import { MovieRatingModal } from "./components/MovieRatingModal";
import { MovieSummary } from "./components/MovieSummary";
import {
  deleteMovieRating,
  getImdbReference,
  getMoviePoster,
  rateMovie,
  getYoutubeReference,
} from "../../services/movielensApiService";

export const MovieScreen: React.FC = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movie, prediction } = route.params;
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [submittedRating, setSubmittedRating] = useState<number | null>(null);

  const releaseYear = movie.releaseYear || movie.releaseDate?.slice(0, 4);
  const predictionText =
    typeof prediction === "number" ? prediction.toFixed(1) : "N/A";

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  const openRateDialog = () => {
    setSelectedRating(submittedRating);
    setIsRateModalVisible(true);
  };

  const closeRateDialog = () => {
    setIsRateModalVisible(false);
  };

  const submitRating = async () => {
    if (selectedRating === null || selectedRating < 1) {
      Alert.alert("Select a rating", "Please choose a value between 1 and 10.");
      return;
    }

    const ratingValue = selectedRating / 2;
    const wasSubmitted = await rateMovie({
      movieId: movie.movieId,
      rating: ratingValue,
      predictedRating: prediction,
      previousRating: submittedRating !== null ? submittedRating / 2 : null,
    });

    if (!wasSubmitted) {
      Alert.alert(
        "Rating failed",
        "Could not submit rating. Please try again.",
      );
      return;
    }

    setSubmittedRating(selectedRating);
    setIsRateModalVisible(false);
  };

  const removeRating = async () => {
    const wasDeleted = await deleteMovieRating(movie.movieId);

    if (!wasDeleted) {
      Alert.alert(
        "Remove failed",
        "Could not remove rating. Please try again.",
      );
      return;
    }

    setSubmittedRating(null);
    setSelectedRating(null);
    setIsRateModalVisible(false);
    Alert.alert("Rating removed", "Your rating has been removed.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MovieHeader
        title={movie.title}
        originalTitle={movie.originalTitle}
        releaseYear={releaseYear}
        mpaa={movie.mpaa}
        runtime={movie.runtime}
      />
      <MovieSummary
        posterUri={getMoviePoster(movie.posterPath)}
        plotSummary={movie.plotSummary}
      />
      <MovieGenres genres={movie.genres} />
      <MovieActions
        predictionText={predictionText}
        submittedRating={submittedRating}
        hasYoutubeTrailer={movie.youtubeTrailerIds.length > 0}
        onRatePress={openRateDialog}
        onOpenImdb={() => openLink(getImdbReference(movie.imdbMovieId))}
        onOpenYoutube={() =>
          openLink(getYoutubeReference(movie.youtubeTrailerIds[0]))
        }
      />
      <MovieDetailsSection
        languages={movie.languages}
        directors={movie.directors}
        actors={movie.actors}
      />
      <MovieRatingModal
        isVisible={isRateModalVisible}
        selectedRating={selectedRating}
        canRemoveRating={submittedRating !== null}
        onClose={closeRateDialog}
        onRatingChange={setSelectedRating}
        onSubmit={submitRating}
        onRemoveRating={removeRating}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
