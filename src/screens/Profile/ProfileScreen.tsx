import React from "react";
import { View, StyleSheet } from "react-native";
import { LogoutButton } from "./LogoutButton";

export const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
