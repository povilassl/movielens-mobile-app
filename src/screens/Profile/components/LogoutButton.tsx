import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../../../types";
import { logout } from "../../../services/movielensApiService";
import { AppButton } from "../../../components/AppButton";

export const LogoutButton: React.FC = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    const rootNavigation = navigation.getParent<RootStackNavigationProp>();
    rootNavigation?.replace("LoginScreen");
  };

  return <AppButton title="Logout" onPress={handleLogout} />;
};
