import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { getFrontPage } from "../services/movielensApiService";
import { FrontPageData } from "../interfaces/FronPageInterfaces";
import { MovieRow } from "./MovieRow";

export const MovieRowList = () => {
  const [frontPageData, setFrontPageData] = useState<FrontPageData>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFrontPage();
      setFrontPageData(data);
      console.log("data: " + frontPageData);
    };

    fetchData();
  }, []);

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
