import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack/";
import { Movie } from "./src/interfaces/FrontPageInterfaces";

export type RootStackParamList = {
  LoginScreen: undefined;
  MainTabs: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  MovieScreen: { movie: Movie; prediction?: number };
};

export type RootTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MovieScreenRouteProp = RouteProp<HomeStackParamList, "MovieScreen">;
