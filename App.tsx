import { HomeScreen } from "./src/screens/Home/HomeScreen";
import { LoginScreen } from "./src/screens/Login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { validateToken } from "./src/services/movielensApiService";
import React from "react";
import { MovieScreen } from "./src/screens/Movie/MovieScreen";
import { ProfileScreen } from "./src/screens/Profile/ProfileScreen";
import { SearchScreen } from "./src/screens/Search/SearchScreen";
import { ExploreScreen } from "./src/screens/Explore/ExploreScreen";
import { FontAwesome } from "@expo/vector-icons";
import {
  HomeStackParamList,
  RootStackParamList,
  SearchStackParamList,
  RootTabParamList,
} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeTabStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "MovieLens" }}
      />
      <HomeStack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{ title: "" }}
      />
    </HomeStack.Navigator>
  );
};

const SearchTabStack = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <SearchStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <SearchStack.Screen
        name="MovieScreen"
        component={MovieScreen}
        options={{ title: "" }}
      />
    </SearchStack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeTabStack}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchTabStack}
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const validToken = await validateToken();
      setIsAuthenticated(validToken);
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingTitle}>MovieLens</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainTabs" : "LoginScreen"}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loadingTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: 0.4,
  },
});
