import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "./MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  shownMovies,
  onShowMoreMovies,
  isAllMoviesAreShown,
  isFinishSearching,
  isErrorMoviesServer,
  onFinishSearching,
  savedMovies,
  onAddToSaved,
  onRemoveFromSaved,
}) {
  const location = useLocation();
  const isLocationMovies = location.pathname === "/movies";

  React.useEffect(() => {
    if (isLocationMovies) {
      isErrorMoviesServer && onFinishSearching();
      isErrorMoviesServer && shownMovies === null && onFinishSearching();
      shownMovies !== null && onFinishSearching();
    }
  }, [isErrorMoviesServer, shownMovies]);
  return (
    (isFinishSearching || !isLocationMovies) && (
      <section className="movies-card-list">
        {isErrorMoviesServer === true && !isLocationMovies && (
          <p className="text">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
        {(isLocationMovies || savedMovies.length !== 0) &&
          isErrorMoviesServer === false &&
          shownMovies &&
          shownMovies.length === 0 && <p className="text">Ничего не найдено</p>}
        {!isLocationMovies &&
          savedMovies.length === 0 &&
          isErrorMoviesServer === false && (
            <p className="text">Список сохраненных фильмов пуст</p>
          )}

        <ul className="movies-card-list__container">
          {shownMovies &&
            shownMovies.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.id || movie.movieId}
                  savedMovies={savedMovies}
                  onAddToSaved={onAddToSaved}
                  onRemoveFromSaved={onRemoveFromSaved}
                />
              );
            })}
        </ul>
        {isLocationMovies &&
          !isAllMoviesAreShown &&
          shownMovies &&
          shownMovies.length !== 0 && (
            <button
              onClick={onShowMoreMovies}
              type="button"
              aria-label="Ещё"
              className="movies-card-list__button-more-movies"
            >
              Ещё
            </button>
          )}
      </section>
    )
  );
}

export default MoviesCardList;
