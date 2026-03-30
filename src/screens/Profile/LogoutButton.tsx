import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../types";
import { logout } from "../../services/movielensApiService";

export const LogoutButton: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    const rootNavigation = navigation.getParent<RootStackNavigationProp>();
    rootNavigation?.replace("LoginScreen");
  };

  return <Button title="Logout" onPress={handleLogout} />;
};
