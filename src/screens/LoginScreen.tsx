import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { login } from "../services/movielensApiService";
import { useNavigation } from "@react-navigation/native";
import { UsernameInput } from "../components/actions/UsernameInput";
import { PasswordInput } from "../components/actions/PaswordInput";

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const loginHandler = async () => {
    const isSuccess = await login(username, password);
    if (isSuccess) {
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <UsernameInput username={username} setUsername={setUsername} />
      <PasswordInput password={password} setPassword={setPassword} />
      <Button title="Submit" onPress={loginHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
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
