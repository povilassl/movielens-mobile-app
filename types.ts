import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
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

export type SearchStackParamList = {
  SearchScreen: undefined;
  ExploreScreen: { title: string; type: "tag" | "people"; query: string };
  MovieScreen: { movie: Movie; prediction?: number };
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList> | undefined;
  SearchTab: NavigatorScreenParams<SearchStackParamList> | undefined;
  ProfileTab: undefined;
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<HomeStackParamList>;

export type SearchScreenNavigationProp = NativeStackNavigationProp<
  SearchStackParamList,
  "SearchScreen"
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "LoginScreen"
>;

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MovieScreenRouteProp = RouteProp<HomeStackParamList, "MovieScreen">;
