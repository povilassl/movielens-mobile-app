import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
} from "react-native";
import { login } from "../../services/movielensApiService";
import { useNavigation } from "@react-navigation/native";
import { UsernameInput } from "./components/UsernameInput";
import { PasswordInput } from "./components/PaswordInput";
import { LoginScreenNavigationProp } from "../../../types";
import { AppButton } from "../../components/AppButton";

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const isSuccess = await login(username, password);
      if (isSuccess) {
        navigation.replace("MainTabs");
      } else {
        Alert.alert("Error", "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>MovieLens</Text>

        <UsernameInput
          username={username}
          setUsername={setUsername}
          disabled={isLoading}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          disabled={isLoading}
        />
        <AppButton
          title="Submit"
          onPress={loginHandler}
          disabled={!username.trim() || !password.trim()}
          loading={isLoading}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
