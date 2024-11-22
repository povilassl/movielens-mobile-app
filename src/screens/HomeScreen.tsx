import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { getFrontPage } from "../services/movielensApiService";
import { FrontPageData } from "../interfaces/FronPageInterfaces";
import { MovieRow } from "../components/MovieRow";

export const HomeScreen: React.FC = () => {
  const [frontPageData, setFrontPageData] = useState<FrontPageData>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFrontPage();
      setFrontPageData(data);
    };

    fetchData();
  }, []);
  console.log("data: " + frontPageData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {frontPageData?.listOfSearchResults.map((section) => (
        <MovieRow
          key={section.title}
          title={section.title}
          searchResults={section.searchResults}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
});
