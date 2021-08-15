import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesListShown, onShowMoreMovies, allMoviesAreShown }) {
  const location = useLocation();
  const isLocationMovies = location.pathname === '/movies';

  return (
    <section className="movies-card-list">
      {!moviesListShown.length && <p className="subtitle">К сожалению, по вашему запросу ничего не найдено.</p>}
      <ul className="movies-card-list__container">
        {
          moviesListShown.map((movie) => {
            return (
              <MoviesCard movie={movie} key={movie._id}/>
            );
          })
        }
      </ul>
      {isLocationMovies && !allMoviesAreShown &&
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
