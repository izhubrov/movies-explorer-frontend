import mainApi from "./mainApi";
import moviesApi from "./moviesApi";

export default function useGetSaveAndRemoveMovies({
  isLoggedIn,
  savedMovies,
  setMoviesItems,
  setErrorMoviesServer,
  setSavedMovies,
  handleShowError,
  setIsFinishSearching
}) {
  function handleSetMoviesToLocalStorage() {
    if (localStorage.getItem("movies") === null) {
      handleGetMovies();
    }
  }

  function handleGetMovies() {
    moviesApi
      .getMovies()
      .then((res) => {
        setMoviesItems(res);
        localStorage.setItem("movies", JSON.stringify(res));
        setTimeout(() => setErrorMoviesServer(false), 3000);
      })
      .catch(async (err) => {
        setIsFinishSearching(true);
        setErrorMoviesServer(true);
      });
  }

  function getSavedMovies() {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(async (err) => {
        if (isLoggedIn !== null) {
          await handleShowError(err);
        }
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
  }

  function handleRemoveFromSavedMovie(movieId) {
    mainApi
      .removeFromSavedMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((item) => item.movieId !== movieId));
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
  }

  return {
    handleSetMoviesToLocalStorage,
    getSavedMovies,
    handleSaveMovie,
    handleRemoveFromSavedMovie,
  };
}
