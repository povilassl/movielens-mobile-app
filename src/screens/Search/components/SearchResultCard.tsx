import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type SearchResultCardProps = {
  label: string;
  onPress: () => void;
};

export const SearchResultCard: React.FC<SearchResultCardProps> = ({
  label,
  onPress,
}) => {
  return (
    <Pressable
      android_ripple={{ color: "#e5e7eb" }}
      style={({ pressed }) => [
        styles.resultCard,
        pressed && styles.resultCardPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.resultText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  resultCardPressed: {
    backgroundColor: "#f3f4f6",
    borderColor: "#d1d5db",
  },
  resultText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
});
