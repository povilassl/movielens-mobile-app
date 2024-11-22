import React from "react";
import { TextInput, StyleSheet } from "react-native";

type Props = {
  password: string;
  setPassword: (value: string) => void;
};

export const PasswordInput: React.FC<Props> = ({ password, setPassword }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
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
