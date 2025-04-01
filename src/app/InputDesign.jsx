"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./InputDesign.module.css";
import NextMovieButton from "./NextMovieButton";

function InputDesign() {
  const [count, setCount] = useState(25);
  const [usedMovies, setUsedMovies] = useState([]);
  const [movieBatch, setMovieBatch] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Loading");
  const loadingInterval = useRef(null);

  // Use environment variable for API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchMovieBatch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          count: count,
          used_movies: usedMovies,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch movies");
      }

      const data = await response.json();
      setMovieBatch(data.movieTitles);
      setCurrentMovieIndex(0);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const nextMovie = () => {
    if (movieBatch.length > 0) {
      const currentMovie = movieBatch[currentMovieIndex];
      // Update used movies when moving to the next one in the batch
      if (!usedMovies.includes(currentMovie)) {
        setUsedMovies([...usedMovies, currentMovie]);
      }

      if (currentMovieIndex < movieBatch.length - 1) {
        setCurrentMovieIndex(currentMovieIndex + 1);
      } else {
        // Batch is exhausted, fetch a new one
        fetchMovieBatch();
      }
    }
  };

  useEffect(() => {
    fetchMovieBatch();
  }, []);

  // Loading animation effect
  useEffect(() => {
    loadingInterval.current = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText === "Loading...") {
          return "Loading";
        } else {
          return prevText + ".";
        }
      });
    }, 500);

    return () => {
      if (loadingInterval.current) {
        clearInterval(loadingInterval.current);
      }
    };
  }, [loading]);

  return (
    <main className={styles.container}>
      {loading && <h1 className={styles.movieTitle}>{loadingText}</h1>}
      {error && (
        <h1 className={styles.movieTitle} style={{ color: "red" }}>
          Error: {error}
        </h1>
      )}
      {movieBatch.length > 0 && !loading && !error && (
        <h1 className={styles.movieTitle}>{movieBatch[currentMovieIndex]}</h1>
      )}
      {movieBatch.length === 0 && !loading && !error && (
        <button onClick={fetchMovieBatch}>Fetch Initial Movies</button>
      )}
      <nav className={styles.navigationControls}>
        <button
          aria-label="Previous Movie"
          className={styles.previousButton}
          onClick={() => {
            if (currentMovieIndex > 0) {
              setCurrentMovieIndex(currentMovieIndex - 1);
            }
          }}
        >
          Previous
        </button>
        <NextMovieButton onClick={nextMovie} />
      </nav>
    </main>
  );
}

export default InputDesign;