import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { movies } from '../../utils/utils';

function MoviesCardList() {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__container">
        {
          movies.map((movie) => {
            return (
              <MoviesCard movie={movie} key={movie._id}/>
            );
          })
        }
      </ul>
    </section>
  );
}

export default MoviesCardList;
