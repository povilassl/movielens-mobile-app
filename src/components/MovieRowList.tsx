import React from "react";
import { FrontPageData } from "../interfaces/FrontPageInterfaces";
import { MovieRow } from "./MovieRow";

type Props = {
  frontPageData?: FrontPageData;
};

export const MovieRowList: React.FC<Props> = ({ frontPageData }) => {
  const nonEmptySections =
    frontPageData?.listOfSearchResults.filter(
      (section) => section.searchResults.length > 0,
    ) ?? [];

  return (
    <>
      {nonEmptySections.map((section) => (
        <MovieRow
          key={section.title}
          title={section.title}
          searchResults={section.searchResults}
        />
      ))}
    </>
  );
};
