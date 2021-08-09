import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../utils/utils';

function MoviesCardList() {

  return (
    <section className="movies-card-list page__container">
      <ul className="movies-card-list__container">
        {
          movies.map((movie) => {
            return (
              <MoviesCard key={movie._id}/>
            );
          })
        }
      </ul>
    </section>
  );
}

export default MoviesCardList;
