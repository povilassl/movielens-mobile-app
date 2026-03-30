import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type MovieDetailsSectionProps = {
  languages: string[];
  directors: string[];
  actors: string[];
};

type ExpandableRowProps = {
  label: string;
  items: string[];
};

const getCollapsedList = (items: string[], expanded: boolean) => {
  if (items.length === 0) {
    return "N/A";
  }

  return (expanded ? items : items.slice(0, 3)).join(", ");
};

const ExpandableRow: React.FC<ExpandableRowProps> = ({ label, items }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>
        {getCollapsedList(items, expanded)}
      </Text>
      {items.length > 3 && (
        <TouchableOpacity
          style={styles.detailToggleButton}
          onPress={() => setExpanded((prev) => !prev)}
        >
          <Text style={styles.detailToggleText}>
            {expanded ? "Show less" : "Show more"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const MovieDetailsSection: React.FC<MovieDetailsSectionProps> = ({
  languages,
  directors,
  actors,
}) => {
  const languageLabel = languages.length === 1 ? "Language" : "Languages";
  const directorLabel = directors.length === 1 ? "Director" : "Directors";

  return (
    <View style={styles.detailsSection}>
      <ExpandableRow label={languageLabel} items={languages} />
      <ExpandableRow label={directorLabel} items={directors} />
      <ExpandableRow label="Cast" items={actors} />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
