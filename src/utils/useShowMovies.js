import React from 'react';
import {
  initialCountOfShownMovies,
  additionalCountOfShownMovies
} from "./utils";

export default function useShowMovies({width, searchedMoviesItems}) {

  const [shownMovies, setShownMovies] = React.useState([]);
  const [isAllMoviesAreShown, setAllMoviesAreShown] = React.useState(false);

  function handleShowInitialMovies() {
    setShownMovies([
      ...searchedMoviesItems.filter(
        (movie, index) => index < initialCountOfShownMovies[width]
      ),
    ]);
  }

  function handleShowMoviesInResize() {
    let alreadyShownMovies = shownMovies.length;
    setShownMovies([]);
    if (alreadyShownMovies < initialCountOfShownMovies[width]) {
      alreadyShownMovies = initialCountOfShownMovies[width];
    } else {
      alreadyShownMovies =
        Math.ceil(alreadyShownMovies / additionalCountOfShownMovies[width]) *
        additionalCountOfShownMovies[width];
    }
    setShownMovies([
      ...searchedMoviesItems.filter(
        (movie, index) => index < alreadyShownMovies
      ),
    ]);
  }

  function handleShowAdditionalMovies() {
    setShownMovies([
      ...shownMovies,
      ...searchedMoviesItems.filter(
        (movie, index) =>
          index >= shownMovies.length &&
          index < shownMovies.length + additionalCountOfShownMovies[width]
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (shownMovies.length === searchedMoviesItems.length) {
      setAllMoviesAreShown(true);
    } else {
      setAllMoviesAreShown(false);
    }
  }
  return {
    shownMovies,
    isAllMoviesAreShown,
    setShownMovies,
    handleShowInitialMovies,
    handleShowMoviesInResize,
    handleShowAdditionalMovies,
    checkCountOfShownMovies
  }
}