import React from "react";
import StarRating from "react-native-star-rating-widget";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MovieRatingModalProps = {
  isVisible: boolean;
  selectedRating: number | null;
  canRemoveRating: boolean;
  onClose: () => void;
  onRatingChange: (rating: number) => void;
  onSubmit: () => void;
  onRemoveRating: () => void;
};

export const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  isVisible,
  selectedRating,
  canRemoveRating,
  onClose,
  onRatingChange,
  onSubmit,
  onRemoveRating,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => undefined}>
          <Text style={styles.modalTitle}>Rate this movie</Text>
          <Text style={styles.modalSubtitle}>
            Choose from 1 to 10 (half-star steps)
          </Text>

          <View style={styles.starWidgetContainer}>
            <StarRating
              rating={(selectedRating ?? 0) / 2}
              onChange={(value) => onRatingChange(Math.round(value * 2))}
              maxStars={5}
              step="half"
              starSize={34}
              color="#f59e0b"
              emptyColor="#cbd5e1"
            />
          </View>

          <View style={styles.modalButtonsRow}>
            {canRemoveRating && (
              <TouchableOpacity
                style={[styles.modalButton, styles.modalRemoveButton]}
                onPress={onRemoveRating}
              >
                <Text style={styles.modalRemoveText}>Remove rating</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalSubmitButton]}
              onPress={onSubmit}
            >
              <Text style={styles.modalSubmitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalRemoveButton: {
    backgroundColor: "#fef2f2",
  },
  modalSubmitButton: {
    backgroundColor: "#111827",
  },
  modalCancelText: {
    color: "#111827",
    fontWeight: "600",
  },
  modalRemoveText: {
    color: "#b91c1c",
    fontWeight: "700",
  },
  modalSubmitText: {
    color: "#fff",
    fontWeight: "700",
  },
});
