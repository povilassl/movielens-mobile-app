import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MovieActionsProps = {
  predictionText: string;
  submittedRating: number | null;
  hasYoutubeTrailer: boolean;
  onRatePress: () => void;
  onOpenImdb: () => void;
  onOpenYoutube: () => void;
};

export const MovieActions: React.FC<MovieActionsProps> = ({
  predictionText,
  submittedRating,
  hasYoutubeTrailer,
  onRatePress,
  onOpenImdb,
  onOpenYoutube,
}) => {
  return (
    <View style={styles.actionsSection}>
      <View style={[styles.actionPill, styles.predictionPill]}>
        <Text style={styles.actionLabel}>Prediction</Text>
        <Text style={styles.actionValue}>{predictionText}</Text>
      </View>
      <TouchableOpacity
        style={[styles.actionPill, styles.ratePill]}
        onPress={onRatePress}
      >
        <Text style={styles.ratePillText}>
          {submittedRating ? `Rated ${submittedRating}/10` : "Rate"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onOpenImdb}
        style={[styles.iconPill, styles.imdbPill]}
      >
        <FontAwesome name="imdb" size={24} color="#f5c518" />
      </TouchableOpacity>
      {hasYoutubeTrailer && (
        <TouchableOpacity
          onPress={onOpenYoutube}
          style={[styles.iconPill, styles.youtubePill]}
        >
          <FontAwesome name="youtube-play" size={24} color="#dc2626" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
