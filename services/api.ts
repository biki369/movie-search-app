export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_API_KEY,
  // API_KEY: "10e97ca62b6ef3ba79edc60087c363ad",
  herders: {
    accept: "application/json",
    Authorization: `Bearer${process.env.EXPO_PUBLIC_API_KEY}`,
    // Authorization: `Bearer 10e97ca62b6ef3ba79edc60087c363ad`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.herders,
  });
  if (!response.ok) {
    throw new Error("Something went wrong", response.statusText);
  }
  const data = await response.json();
  return data.results;
};




//
