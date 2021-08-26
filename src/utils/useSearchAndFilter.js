import React from "react";
import { shortMovieDuration } from "./utils";

export default function useSearchAndFilter({
  moviesItems,
  savedMovies,
  setIsFinishSearching,
  setIsFinishSavedSearching,
  setErrorMoviesServer,
}) {
  const [searchedMoviesItems, setSearchedMoviesItems] = React.useState();
  const [searchInputValue, setSearchInputValue] = React.useState("");
  const [savedSearchInputValue, setSavedSearchInputValue] = React.useState("");
  const [searchedSavedMoviesItems, setSearchedSavedMoviesItems] =
    React.useState();
  const [isShortMoviesFilterOn, setShortMoviesFilterOn] = React.useState(null);
  const [isShortSavedMoviesFilterOn, setShortSavedMoviesFilterOn] =
    React.useState(null);

  function handleInnerSearching(movie, isMoviesPageSearching) {
    const input = isMoviesPageSearching
      ? searchInputValue
      : savedSearchInputValue;
    return Object.values(movie).find((features) => {
      return (
        typeof features === "string" &&
        features.toLowerCase().includes(input.toLowerCase())
      );
    });
  }

  function handleSearchingFilter(inputData, isMoviesPageSearching) {
    return inputData.filter((movie) =>
      handleInnerSearching(movie, isMoviesPageSearching)
    );
  }

  function handleDurationFilter(inputData) {
    return inputData.filter((movie) => movie.duration <= shortMovieDuration);
  }

  function handleSearchMovies() {
    let searchedMovies = JSON.parse(localStorage.getItem("searchedMovies"));
    if (searchInputValue && moviesItems && moviesItems.length !== 0) {
      searchedMovies = handleSearchingFilter(moviesItems, true);
    }
    if (
      isShortMoviesFilterOn &&
      searchedMovies &&
      searchedMovies.length !== 0
    ) {
      const filteredSearchedMovies = handleDurationFilter(searchedMovies);
      setSearchedMoviesItems(filteredSearchedMovies);
    } else {
      searchInputValue &&
        localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
      setSearchedMoviesItems(searchedMovies);
    }
    setIsFinishSearching(true);
  }

  function handleSearchSavedMovies() {
    setErrorMoviesServer(false);
    const searchedSavedMovies = handleSearchingFilter(savedMovies, false);
    if (isShortSavedMoviesFilterOn) {
      const filteredSearchedSavedMovies =
        handleDurationFilter(searchedSavedMovies);
      setSearchedSavedMoviesItems(filteredSearchedSavedMovies);
    } else {
      setSearchedSavedMoviesItems(searchedSavedMovies);
    }
    setIsFinishSavedSearching(true);
  }

  function handleFilterMovies() {
    setShortMoviesFilterOn(!isShortMoviesFilterOn);
    localStorage.setItem("isShortMoviesFilterOn", !isShortMoviesFilterOn);
  }

  function handleFilterSavedMovies() {
    setShortSavedMoviesFilterOn(!isShortSavedMoviesFilterOn);
    localStorage.setItem(
      "isShortSavedMoviesFilterOn",
      !isShortSavedMoviesFilterOn
    );
  }

  function handleSetSearchInputValue(searchedMovie) {
    setSearchInputValue(searchedMovie);
  }

  function handleSetSavedSearchInputValue(searchedMovie) {
    setSavedSearchInputValue(searchedMovie);
  }

  function handleClearSavedMoviesInput() {
    setSavedSearchInputValue("");
  }
  return {
    searchedMoviesItems,
    searchedSavedMoviesItems,
    searchInputValue,
    savedSearchInputValue,
    isShortMoviesFilterOn,
    isShortSavedMoviesFilterOn,
    handleSearchMovies,
    handleSearchSavedMovies,
    handleFilterMovies,
    handleFilterSavedMovies,
    handleSetSearchInputValue,
    handleSetSavedSearchInputValue,
    handleClearSavedMoviesInput,
    setSearchInputValue,
    setSearchedMoviesItems,
    setShortMoviesFilterOn,
    setShortSavedMoviesFilterOn,
  };
}
