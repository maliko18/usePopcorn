import { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_API_KEY;
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovie() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          // if (!res.ok)
          //   throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          if (err.message === "Failed to fetch")
            setError("Something went wrong");
          else if (!err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovie();

      return function () {
        // controller.abort();
        //TODO : fix that
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
