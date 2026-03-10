export interface FrontPageData {
  listOfSearchResults: ListOfSearchResults[];
}

export interface ListOfSearchResults {
  title: string;
  description?: string;
  url: string;
  searchResults: SearchResult[];
  pager: Pager;
}

export interface SearchResult {
  movieId: number;
  rec_val_type: string;
  tstamp?: string;
  movie: Movie;
  movieUserData: MovieUserData;
}

export interface Movie {
  movieId: number;
  tmdbMovieId: number;
  imdbMovieId: string;
  title: string;
  originalTitle?: string;
  mpaa?: string;
  runtime: number;
  releaseDate: string;
  dvdReleaseDate?: string;
  genres: string[];
  languages: string[];
  directors: string[];
  actors: string[];
  posterPath: string;
  posterImage?: string;
  backdropPaths: string[];
  youtubeTrailerIds: string[];
  plotSummary: string;
  numRatings: number;
  avgRating: number;
  releaseYear: string;
}

export interface MovieUserData {
  userId: number;
  movieId: number;
  rating: any;
  dateRated: any;
  prediction: number;
  wishlist: boolean;
  hidden: boolean;
  predictionDetails: PredictionDetails;
}

export interface PredictionDetails {
  primaryPrediction: number;
  primaryPredictionType: string;
  components: Component[];
}

export interface Component {
  pred: number;
  type: string;
}

export interface Pager {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
