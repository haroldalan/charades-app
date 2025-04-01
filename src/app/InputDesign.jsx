"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./InputDesign.module.css";
import NextMovieButton from "./NextMovieButton";

function InputDesign() {
  const [count, setCount] = useState(25);
  const [usedMovies, setUsedMovies] = useState([]);
  const [movieBatch, setMovieBatch] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const previousButtonRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL; // Using environment variable

  const fetchMovieBatch = async () => {
    setLoading(true);
    setError(null);
    setLoadingDots(""); // Reset dots when fetching

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

  const previousMovie = useCallback(() => {
    if (movieBatch.length > 0 && currentMovieIndex > 0) {
      setCurrentMovieIndex(currentMovieIndex - 1);
    }
  }, [movieBatch, currentMovieIndex]);

  const handlePreviousClick = () => {
    if (!loading && currentMovieIndex > 0 && previousButtonRef.current) {
      previousButtonRef.current.classList.add(styles.buttonClick);
      setTimeout(() => {
        if (previousButtonRef.current) {
          previousButtonRef.current.classList.remove(styles.buttonClick);
        }
        previousMovie();
      }, 100);
    } else if (!loading) {
      previousMovie();
    }
  };

  const nextMovie = () => {
    if (movieBatch.length > 0) {
      const currentMovie = movieBatch[currentMovieIndex];
      if (!usedMovies.includes(currentMovie)) {
        setUsedMovies([...usedMovies, currentMovie]);
      }

      if (currentMovieIndex < movieBatch.length - 1) {
        setCurrentMovieIndex(currentMovieIndex + 1);
      } else {
        fetchMovieBatch();
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (loading) {
      intervalId = setInterval(() => {
        setLoadingDots((prevDots) => {
          if (prevDots.length < 3) {
            return prevDots + ".";
          } else {
            return "";
          }
        });
      }, 500);
    } else {
      clearInterval(intervalId);
      setLoadingDots("");
    }

    return () => clearInterval(intervalId);
  }, [loading]);

  useEffect(() => {
    fetchMovieBatch();
  }, []);

  return (
    <>
      <main className={styles.container}>
        {loading && <h1 className={styles.movieTitle}>Loading{loadingDots}</h1>}
        {error && (
          <button
            onClick={fetchMovieBatch}
            style={{
              background: "none",
              border: "2px solid red",
              padding: "10px 20px",
              cursor: "pointer",
              color: "red",
              fontFamily: "Impact, sans-serif",
              fontSize: "20px",
            }}
          >
            Refresh
          </button>
        )}
        {movieBatch.length > 0 && !loading && !error && (
          <h1 className={styles.movieTitle}>
            {movieBatch[currentMovieIndex]}
          </h1>
        )}
        {movieBatch.length === 0 && !loading && !error && (
          <button onClick={fetchMovieBatch}>Fetch Initial Movies</button>
        )}
        <div className={styles.ctaContainer}>
          <button
            ref={previousButtonRef}
            onClick={handlePreviousClick}
            disabled={loading || currentMovieIndex === 0}
            style={{
              background: "none",
              border: "none",
              padding: "0",
              cursor: loading || currentMovieIndex === 0 ? "not-allowed" : "pointer",
              color: loading || currentMovieIndex === 0 ? "#555" : "#fff",
              fontFamily: "Impact",
              fontSize: "16px",
              transition: "opacity 0.1s ease-in-out",
            }}
          >
            Previous
          </button>
          <NextMovieButton onClick={nextMovie} disabled={loading} />
        </div>
      </main>
    </>
  );
}

export default InputDesign;