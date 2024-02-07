import axios from "axios";
import appConfig from "../configs/index";

export const getMovieById = async (id) => {
  const options = {
    method: "GET",
    baseURL: appConfig.api_baseurl,
    url: `/movie/${id}`,
    params: {
      language: "en-US",
      append_to_response:"credits"
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${appConfig.auth_key}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMovies = async (searchTerm, searchType) => {
  const options = {
    method: "GET",
    baseURL: appConfig.api_baseurl,
    url: searchType,
    params: {
      query: searchTerm,
      include_adult: false,
      language: "en-IN",
      region: "IN",
      original_language: "es",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${appConfig.auth_key}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const getMovieVideosById = async (id) => {
  const options = {
    method: "GET",
    baseURL: appConfig.api_baseurl,
    url: `/movie/${id}/videos`,
    params: {
      language: "en-US"
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${appConfig.auth_key}`,
    },
  };

  try {
    const response = await axios(options);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};
