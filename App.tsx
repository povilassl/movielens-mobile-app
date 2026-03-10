import { HomeScreen } from "./src/screens/HomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { validateToken } from "./src/services/movielensApiService";
import React from "react";
import { MovieScreen } from "./src/screens/MovieScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import {
  HomeStackParamList,
  RootStackParamList,
  RootTabParamList,
} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
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
    //Can show loading indicator here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? "MainTabs" : "LoginScreen"}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
