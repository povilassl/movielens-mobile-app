import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MovieRowList } from "./components/MovieRowList";
import { FrontPageData } from "../../interfaces/FrontPageInterfaces";
import { getFrontPageData } from "../../services/movielensApiService";

export const HomeScreen: React.FC = () => {
  const [frontPageData, setFrontPageData] = useState<FrontPageData>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    const data = await getFrontPageData();
    console.log("data: ", data);
    setFrontPageData(data);
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await fetchData();
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const refreshHandler = async () => {
    setIsRefreshing(true);

    try {
      await fetchData();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <View
        pointerEvents={isRefreshing ? "none" : "auto"}
        style={styles.contentContainer}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshHandler}
            />
          }
          scrollEnabled={!isRefreshing}
        >
          <MovieRowList frontPageData={frontPageData} />
        </ScrollView>
      </View>

      {isRefreshing && (
        <View style={styles.blockingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blockingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
