import { useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import StarRating from "react-native-star-rating-widget";
import {
  Alert,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { MovieScreenRouteProp } from "../../types";
import {
  getImdbReference,
  getMoviePoster,
  getYoutubeReference,
} from "../services/movielensApiService";

export const MovieScreen: React.FC = () => {
  const route = useRoute<MovieScreenRouteProp>();
  const { movie, prediction } = route.params;
  const [isPlotExpanded, setIsPlotExpanded] = useState(false);
  const [isLanguagesExpanded, setIsLanguagesExpanded] = useState(false);
  const [isDirectorsExpanded, setIsDirectorsExpanded] = useState(false);
  const [isCastExpanded, setIsCastExpanded] = useState(false);
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [submittedRating, setSubmittedRating] = useState<number | null>(null);

  const releaseYear = movie.releaseYear || movie.releaseDate?.slice(0, 4);
  const shouldShowPlotToggle = movie.plotSummary.length > 220;
  const normalizedTitle = movie.title.trim().toLowerCase();
  const normalizedOriginalTitle = movie.originalTitle?.trim().toLowerCase();
  const shouldShowOriginalTitle =
    Boolean(movie.originalTitle) && normalizedOriginalTitle !== normalizedTitle;
  const predictionText =
    typeof prediction === "number" ? prediction.toFixed(1) : "N/A";
  const languageLabel = movie.languages.length === 1 ? "Language" : "Languages";
  const directorLabel = movie.directors.length === 1 ? "Director" : "Directors";

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

  const submitRating = () => {
    if (selectedRating === null || selectedRating < 1) {
      Alert.alert("Select a rating", "Please choose a value between 1 and 10.");
      return;
    }

    setSubmittedRating(selectedRating);
    setIsRateModalVisible(false);
    Alert.alert(
      "Rating submitted",
      `You rated this movie ${selectedRating}/10.`,
    );
  };

  const getCollapsedList = (items: string[], expanded: boolean) => {
    if (items.length === 0) {
      return "N/A";
    }

    return (expanded ? items : items.slice(0, 3)).join(", ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{movie.title}</Text>
      {shouldShowOriginalTitle && (
        <Text style={styles.originalTitle}>{movie.originalTitle}</Text>
      )}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{releaseYear || ""}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{movie.mpaa || ""}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{movie.runtime} min</Text>
        </View>
      </View>
      <View style={styles.summaryRow}>
        <Image
          source={{ uri: getMoviePoster(movie.posterPath) }}
          style={styles.poster}
        />
        <View style={styles.plotContainer}>
          <Text
            style={styles.plot}
            numberOfLines={isPlotExpanded ? undefined : 7}
          >
            {movie.plotSummary}
          </Text>
          {shouldShowPlotToggle && (
            <TouchableOpacity
              onPress={() => setIsPlotExpanded((prev) => !prev)}
              style={styles.plotToggleButton}
            >
              <Text style={styles.plotToggleText}>
                {isPlotExpanded ? "Read less" : "Read more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {movie.genres.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreList}
        >
          {movie.genres.map((genre) => (
            <View key={genre} style={styles.genreChip}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.actionsSection}>
        <View style={[styles.actionPill, styles.predictionPill]}>
          <Text style={styles.actionLabel}>Prediction</Text>
          <Text style={styles.actionValue}>{predictionText}</Text>
        </View>
        <TouchableOpacity
          style={[styles.actionPill, styles.ratePill]}
          onPress={openRateDialog}
        >
          <Text style={styles.ratePillText}>
            {submittedRating ? `Rated ${submittedRating}/10` : "Rate"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openLink(getImdbReference(movie.imdbMovieId))}
          style={[styles.iconPill, styles.imdbPill]}
        >
          <FontAwesome name="imdb" size={24} color="#f5c518" />
        </TouchableOpacity>
        {movie.youtubeTrailerIds.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              openLink(getYoutubeReference(movie.youtubeTrailerIds[0]))
            }
            style={[styles.iconPill, styles.youtubePill]}
          >
            <FontAwesome name="youtube-play" size={24} color="#dc2626" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{languageLabel}</Text>
          <Text style={styles.detailValue}>
            {getCollapsedList(movie.languages, isLanguagesExpanded)}
          </Text>
          {movie.languages.length > 3 && (
            <TouchableOpacity
              style={styles.detailToggleButton}
              onPress={() => setIsLanguagesExpanded((prev) => !prev)}
            >
              <Text style={styles.detailToggleText}>
                {isLanguagesExpanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>{directorLabel}</Text>
          <Text style={styles.detailValue}>
            {getCollapsedList(movie.directors, isDirectorsExpanded)}
          </Text>
          {movie.directors.length > 3 && (
            <TouchableOpacity
              style={styles.detailToggleButton}
              onPress={() => setIsDirectorsExpanded((prev) => !prev)}
            >
              <Text style={styles.detailToggleText}>
                {isDirectorsExpanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cast</Text>
          <Text style={styles.detailValue}>
            {getCollapsedList(movie.actors, isCastExpanded)}
          </Text>
          {movie.actors.length > 3 && (
            <TouchableOpacity
              style={styles.detailToggleButton}
              onPress={() => setIsCastExpanded((prev) => !prev)}
            >
              <Text style={styles.detailToggleText}>
                {isCastExpanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Modal
        visible={isRateModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeRateDialog}
      >
        <Pressable style={styles.modalBackdrop} onPress={closeRateDialog}>
          <Pressable style={styles.modalCard} onPress={() => undefined}>
            <Text style={styles.modalTitle}>Rate this movie</Text>
            <Text style={styles.modalSubtitle}>
              Choose from 1 to 10 (half-star steps)
            </Text>

            <View style={styles.starWidgetContainer}>
              <StarRating
                rating={(selectedRating ?? 0) / 2}
                onChange={(value) => setSelectedRating(Math.round(value * 2))}
                maxStars={5}
                step="half"
                starSize={34}
                color="#f59e0b"
                emptyColor="#cbd5e1"
              />
            </View>

            <Text style={styles.modalSelectedValue}>
              Selected: {selectedRating ?? "-"}/10
            </Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={closeRateDialog}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalSubmitButton]}
                onPress={submitRating}
              >
                <Text style={styles.modalSubmitText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  plotContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
  },
  originalTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
  },
  metaItem: {
    flex: 1,
    alignItems: "center",
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "600",
  },
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
  plot: {
    fontSize: 16,
    lineHeight: 22,
  },
  plotToggleButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  plotToggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1d4ed8",
  },
  actionsSection: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 6,
    marginBottom: 16,
    columnGap: 8,
    rowGap: 8,
  },
  actionPill: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  predictionPill: {
    minWidth: 96,
  },
  actionLabel: {
    color: "#64748b",
    fontSize: 10,
    textTransform: "uppercase",
    lineHeight: 12,
  },
  actionValue: {
    color: "#0f172a",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 18,
  },
  ratePill: {
    minWidth: 88,
    borderColor: "#111827",
    backgroundColor: "#111827",
    alignItems: "center",
  },
  ratePillText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  iconPill: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imdbPill: {
    borderColor: "#fde68a",
    backgroundColor: "#fffbeb",
  },
  youtubePill: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },
  detailsSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginBottom: 20,
    gap: 10,
  },
  detailRow: {
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#6b7280",
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 16,
    color: "#111827",
    lineHeight: 22,
  },
  detailToggleButton: {
    alignSelf: "flex-start",
  },
  detailToggleText: {
    fontSize: 14,
    color: "#1d4ed8",
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  modalSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6b7280",
  },
  starWidgetContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  modalSelectedValue: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
    gap: 8,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalCancelButton: {
    backgroundColor: "#e5e7eb",
  },
  modalSubmitButton: {
    backgroundColor: "#111827",
  },
  modalCancelText: {
    color: "#111827",
    fontWeight: "600",
  },
  modalSubmitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
