import React from "react";
import { StyleSheet, Text, View } from "react-native";

type MovieHeaderProps = {
  title: string;
  originalTitle?: string;
  releaseYear?: string;
  mpaa?: string;
  runtime: number;
};

export const MovieHeader: React.FC<MovieHeaderProps> = ({
  title,
  originalTitle,
  releaseYear,
  mpaa,
  runtime,
}) => {
  const normalizedTitle = title.trim().toLowerCase();
  const normalizedOriginalTitle = originalTitle?.trim().toLowerCase();
  const shouldShowOriginalTitle =
    Boolean(originalTitle) && normalizedOriginalTitle !== normalizedTitle;

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      {shouldShowOriginalTitle && (
        <Text style={styles.originalTitle}>{originalTitle}</Text>
      )}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{releaseYear || ""}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{mpaa || ""}</Text>
        </View>
        <View style={styles.metaItem}>
          <Text style={styles.metaValue}>{runtime} min</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
});
