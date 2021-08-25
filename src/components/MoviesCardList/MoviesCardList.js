import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "./MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  shownMovies,
  onShowMoreMovies,
  isAllMoviesAreShown,
  isErrorMoviesServer,
  isFinishSearching,
  savedMovies,
  onAddToSaved,
  onRemoveFromSaved,
}) {
  const location = useLocation();
  const isLocationMovies = location.pathname === "/movies";
  return (
    isFinishSearching && (
      <section className="movies-card-list">
        {isErrorMoviesServer === true && (
          <p className="text">
            Во время запроса произошла ошибка. Возможно, проблема с соединением
            или сервер недоступен. Подождите немного и попробуйте ещё раз
          </p>
        )}
        {isErrorMoviesServer === false && isFinishSearching &&
          shownMovies.length === 0 &&
          (isLocationMovies || savedMovies.length !== 0) && (
            <p className="text">Ничего не найдено</p>
          )}
        {isErrorMoviesServer === false && !isLocationMovies && savedMovies.length === 0 && (
          <p className="text">Список сохраненных фильмов пуст</p>
        )}

        <ul className="movies-card-list__container">
          {shownMovies.map((movie) => {
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
        {isLocationMovies && !isAllMoviesAreShown && shownMovies.length !== 0 && (
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
