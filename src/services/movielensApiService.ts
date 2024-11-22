import AsyncStorage from "@react-native-async-storage/async-storage";
import { FrontPageData } from "../interfaces/FronPageInterfaces";

export const validateToken = async (): Promise<boolean> => {
  try {
    const cookie = await AsyncStorage.getItem("sessionCookie");

    if (cookie) {
      const expiresMatch = cookie.match(/Expires=([A-Za-z,0-9\-\s\:]+)/);

      if (expiresMatch && expiresMatch[1]) {
        const expiresDateString = expiresMatch[1];
        const expiresDate = new Date(expiresDateString);
        const currentDate = new Date();

        if (expiresDate < currentDate) {
          return false;
        } else {
          return true;
        }
      }

      return false;
    }
  } catch (error) {
    console.error("Error during token validation:", error);
    return false;
  }

  return false;
};

export const login = async (
  username: string,
  password: string
): Promise<boolean> => {
  const url = "https://movielens.org/api/sessions";

  const body = {
    userName: username,
    password: password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false;
    }

    const sessionCookie = response.headers.get("set-cookie");
    if (sessionCookie) {
      await AsyncStorage.setItem("sessionCookie", sessionCookie);
      console.log("refreshed cookie");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error logging in:", error);
    return false;
  }
};

const getSessionCookie = async () => {
  try {
    return await AsyncStorage.getItem("sessionCookie");
  } catch (error) {
    console.error("Error retrieving session cookie:", error);
    return null;
  }
};

export const getFrontPage = async () => {
  const url = "https://movielens.org/api/users/me/frontpage";
  const cookie = await getSessionCookie();

  const cleanCookie = cookie?.split(";")[0]; // Get only the "key=value" part

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cleanCookie || "",
      },
    });

    //TODO analyze error handling
    if (!response.ok) {
      console.error("There was an error getting front page", response);
    }

    const responseData: FrontPageData = (await response.json()).data;
    return responseData;
  } catch (error) {
    console.error("There was an error getting front page", error);
  }
};

export const getMoviePoster = (url: string): string => {
  return "https://image.tmdb.org/t/p/w500" + url;
};

export const getImdbReference = (imdbId: string): string => {
  return "https://www.imdb.com/title/tt" + imdbId;
};

export const getYoutubeReference = (youtubeId: string): string => {
  return "https://www.youtube.com/" + youtubeId;
};
