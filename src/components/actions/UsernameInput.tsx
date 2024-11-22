import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  username: string;
  setUsername: (value: string) => void;
};

export const UsernameInput: React.FC<Props> = ({ username, setUsername }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Username"
      value={username}
      autoFocus
      onChangeText={setUsername}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    maxWidth: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});
