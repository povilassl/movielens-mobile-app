import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  username: string;
  setUsername: (value: string) => void;
  disabled?: boolean;
};

export const UsernameInput: React.FC<Props> = ({
  username,
  setUsername,
  disabled,
}) => {
  return (
    <TextInput
      style={[styles.input, disabled && styles.inputDisabled]}
      placeholder="Username"
      value={username}
      autoFocus
      editable={!disabled}
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
  inputDisabled: {
    backgroundColor: "#f3f4f6",
    color: "#9ca3af",
  },
});
