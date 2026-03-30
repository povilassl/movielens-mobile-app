import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MovieSummaryProps = {
  posterUri: string;
  plotSummary: string;
};

export const MovieSummary: React.FC<MovieSummaryProps> = ({
  posterUri,
  plotSummary,
}) => {
  const [isPlotExpanded, setIsPlotExpanded] = useState(false);
  const shouldShowPlotToggle = plotSummary.length > 220;

  return (
    <View style={styles.summaryRow}>
      <Image source={{ uri: posterUri }} style={styles.poster} />
      <View style={styles.plotContainer}>
        <Text
          style={styles.plot}
          numberOfLines={isPlotExpanded ? undefined : 7}
        >
          {plotSummary}
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
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 8,
  },
  plotContainer: {
    flex: 1,
    marginLeft: 12,
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
});
