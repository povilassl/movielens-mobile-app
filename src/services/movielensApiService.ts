import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FrontPageData,
  Movie,
  MovieUserData,
  SearchResult,
} from "../interfaces/FrontPageInterfaces";

const API_BASE_URL = "https://movielens.org/api";
const SESSION_COOKIE_KEY = "sessionCookie";

const buildJsonHeaders = (cookie?: string): HeadersInit => ({
  "Content-Type": "application/json",
  ...(cookie ? { Cookie: cookie } : {}),
});

const getSessionCookie = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(SESSION_COOKIE_KEY);
  } catch (error) {
    console.error("Error retrieving session cookie:", error);
    return null;
  }
};

const getCleanSessionCookie = async (): Promise<string> => {
  const cookie = await getSessionCookie();
  return cookie?.split(";")[0] ?? "";
};

type ApiRequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  requiresAuth?: boolean;
  parseJson?: boolean;
};

type ApiRequestResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
};

const apiRequest = async <T = unknown>(
  path: string,
  {
    method = "GET",
    body,
    requiresAuth = true,
    parseJson = true,
  }: ApiRequestOptions = {},
): Promise<ApiRequestResult<T>> => {
  try {
    const cleanCookie = requiresAuth ? await getCleanSessionCookie() : "";
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: buildJsonHeaders(cleanCookie),
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });

    const sessionCookie = response.headers.get("set-cookie");
    if (sessionCookie) {
      await AsyncStorage.setItem(SESSION_COOKIE_KEY, sessionCookie);
    }

    if (!response.ok) {
      return { ok: false, status: response.status };
    }

    if (!parseJson) {
      return { ok: true, status: response.status };
    }

    const data = (await response.json()) as T;
    return { ok: true, status: response.status, data };
  } catch (error) {
    console.error(`API request failed for ${method} ${path}:`, error);
    return { ok: false, status: 0 };
  }
};

export const validateToken = async (): Promise<boolean> => {
  try {
    const cookie = await AsyncStorage.getItem(SESSION_COOKIE_KEY);

    if (!cookie) {
      return false;
    }

    const expiresMatch = cookie.match(/Expires=([A-Za-z,0-9\-\s:]+)/);

    if (!expiresMatch || !expiresMatch[1]) {
      return false;
    }

    const expiresDateString = expiresMatch[1];
    const expiresDate = new Date(expiresDateString);
    const currentDate = new Date();

    if (expiresDate < currentDate) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const response = await apiRequest("/sessions", {
    method: "POST",
    requiresAuth: false,
    parseJson: false,
    body: {
      userName: username,
      password,
    },
  });

  if (!response.ok) {
    return false;
  }

  const sessionCookie = await getSessionCookie();
  return Boolean(sessionCookie);
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_COOKIE_KEY);
  } catch (error) {
    console.error("Error trying to logout:", error);
  }
};

export const getFrontPageData = async () => {
  const response = await apiRequest<{ data: FrontPageData }>(
    "/users/me/frontpage",
  );

  if (!response.ok || !response.data) {
    console.error("There was an error getting front page", response.status);
    return undefined;
  }

  return response.data.data;
};

type RateMoviePayload = {
  movieId: number;
  rating: number;
  predictedRating?: number;
  previousRating?: number | null;
};

export type OmniSearchMovie = {
  movieId: number;
  label: string;
};

export type OmniSearchPerson = {
  name: string;
};

export type OmniSearchTag = {
  tag: string;
};

export type OmniSearchResult = {
  movies: OmniSearchMovie[];
  people: OmniSearchPerson[];
  tags: OmniSearchTag[];
};

type OmniSearchResponse = {
  status: string;
  data: {
    movieViewModel: {
      payload: OmniSearchMovie[];
      hasMoreResults: boolean;
    };
    peopleViewModel: {
      payload: OmniSearchPerson[];
    };
    tunerViewModel: {
      payload: OmniSearchTag[];
    };
  };
};

type ExploreResponse = {
  status: string;
  data: {
    searchResults: SearchResult[];
  };
};

type MovieDetailsResponse = {
  status: string;
  data: {
    movieDetails: {
      movie: Movie;
      movieUserData?: MovieUserData;
    };
  };
};

type MovieDetailsResult = {
  movie: Movie;
  prediction?: number;
};

export const searchMovies = async (
  query: string,
): Promise<OmniSearchResult> => {
  const empty: OmniSearchResult = { movies: [], people: [], tags: [] };
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return empty;
  }

  const response = await apiRequest<OmniSearchResponse>(
    `/searches/omni/${encodeURIComponent(trimmedQuery)}`,
  );

  if (!response.ok || !response.data) {
    console.error("Failed to search movies", response.status);
    return empty;
  }

  const { movieViewModel, peopleViewModel, tunerViewModel } =
    response.data.data;

  return {
    movies: movieViewModel?.payload ?? [],
    people: peopleViewModel?.payload ?? [],
    tags: tunerViewModel?.payload ?? [],
  };
};

export const exploreByTag = async (tag: string): Promise<SearchResult[]> => {
  const response = await apiRequest<ExploreResponse>(
    `/movies/explore?tag=${encodeURIComponent(tag)}&sortBy=tagScore`,
  );

  if (!response.ok || !response.data) {
    console.error("Failed to explore by tag", response.status);
    return [];
  }

  return response.data.data.searchResults ?? [];
};

export const exploreByPeople = async (
  person: string,
): Promise<SearchResult[]> => {
  const response = await apiRequest<ExploreResponse>(
    `/movies/explore?people=${encodeURIComponent(person.toLowerCase())}&sortBy=prediction`,
  );

  if (!response.ok || !response.data) {
    console.error("Failed to explore by person", response.status);
    return [];
  }

  return response.data.data.searchResults ?? [];
};

export const getMovieDetailsById = async (
  movieId: number,
): Promise<MovieDetailsResult | null> => {
  const response = await apiRequest<MovieDetailsResponse>(`/movies/${movieId}`);

  if (!response.ok || !response.data) {
    console.error("Failed to get movie details", response.status);
    return null;
  }

  const details = response.data.data.movieDetails;

  if (!details?.movie) {
    return null;
  }

  return {
    movie: details.movie,
    prediction: details.movieUserData?.prediction,
  };
};

export const rateMovie = async ({
  movieId,
  rating,
  predictedRating,
  previousRating,
}: RateMoviePayload): Promise<boolean> => {
  const response = await apiRequest("/users/me/ratings", {
    method: "POST",
    parseJson: false,
    body: {
      movieId,
      rating,
      predictedRating,
      previousRating,
    },
  });

  if (!response.ok) {
    console.error("Failed to submit rating", response.status);
    return false;
  }

  return true;
};

export const deleteMovieRating = async (movieId: number): Promise<boolean> => {
  const response = await apiRequest(`/users/me/ratings/${movieId}`, {
    method: "DELETE",
    parseJson: false,
  });

  if (!response.ok) {
    console.error("Failed to delete rating", response.status);
    return false;
  }

  return true;
};

export const getMoviePoster = (url: string): string => {
  return "https://image.tmdb.org/t/p/w500" + url;
};

export const getImdbReference = (imdbId: string): string => {
  return "https://www.imdb.com/title/tt" + imdbId;
};

export const getYoutubeReference = (youtubeId: string): string => {
  return "https://www.youtube.com/watch?v=" + youtubeId;
};
