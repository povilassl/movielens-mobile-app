import { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack/";
import { Movie } from "./src/interfaces/FronPageInterfaces";

export type RootStackParamList = {
  Home: undefined;
  Movie: { movie: Movie };
};

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type MovieScreenRouteProp = RouteProp<RootStackParamList, "Movie">;
