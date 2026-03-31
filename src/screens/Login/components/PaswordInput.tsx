import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  password: string;
  setPassword: (value: string) => void;
  disabled?: boolean;
};

export const PasswordInput: React.FC<Props> = ({
  password,
  setPassword,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={[styles.shell, disabled && styles.shellDisabled]}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!visible}
        autoCapitalize="none"
        autoCorrect={false}
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={() => setVisible((v) => !v)}
        hitSlop={8}
        style={styles.toggle}
        accessibilityLabel={visible ? "Hide password" : "Show password"}
      >
        <FontAwesome
          name={visible ? "eye-slash" : "eye"}
          size={18}
          color="#6b7280"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shell: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#fff",
    paddingRight: 12,
  },
  shellDisabled: {
    backgroundColor: "#f3f4f6",
  },
  input: {
    flex: 1,
    padding: 10,
  },
  toggle: {
    paddingLeft: 8,
  },
});
