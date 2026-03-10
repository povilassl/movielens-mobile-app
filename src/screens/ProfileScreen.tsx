import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../services/movielensApiService";
import { RootStackNavigationProp } from "../../types";

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const logoutHandler = async () => {
    await logout();
    const rootNavigation = navigation.getParent<RootStackNavigationProp>();
    rootNavigation?.replace("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={logoutHandler} />
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
