import React from 'react';
import './MoviesCardList.css';
import MoviesCard from './MoviesCard/MoviesCard';
import { movies } from '../../utils/utils';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  const location = useLocation();
  const isLocationMovies = location.pathname == '/movies';

  function handleAddMoreMovies() {

  }

  return (
    <section className="movies-card-list">
      {movies.length === 0 && <p className="subtitle">К сожалению, по вашему запросу ничего не найдено.</p>}
      <ul className="movies-card-list__container">
        {
          movies.map((movie) => {
            return (
              <MoviesCard movie={movie} key={movie._id}/>
            );
          })
        }
      </ul>
      {isLocationMovies &&
        <button
          onClick={handleAddMoreMovies}
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
