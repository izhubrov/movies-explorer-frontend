import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({shownMovies, onShowMoreMovies, isAllMoviesAreShown, isErrorMoviesServer, isFinishSearching }) {
  const location = useLocation();
  const isLocationMovies = location.pathname === '/movies';
  return (
    <section className="movies-card-list">
      {isFinishSearching && shownMovies.length === 0 && <p className="text">Ничего не найдено</p>}
      {isErrorMoviesServer && <p className="text">Во время запроса произошла ошибка.
       Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
       </p>
      }
      <ul className="movies-card-list__container">
        {
          shownMovies.map((movie) => {
            return (
              <MoviesCard movie={movie} key={movie.id}/>
            );
          })
        }
      </ul>
      {isLocationMovies && !isAllMoviesAreShown &&
        <button
          onClick={onShowMoreMovies}
          type="button"
          aria-label="Ещё"
          className="movies-card-list__button-more-movies"
        >
          Ещё
        </button>
      }
    </section>
  );
}

export default MoviesCardList;
