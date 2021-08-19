import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({isMoviesListShown, savedMovies, onAddToSaved, onRemoveFromSaved}) {
  return (
    <section className="saved-movies page__container">
      <SearchForm/>
      <FilterCheckBox/>
      {/* <Preloader/> */}
      <MoviesCardList isMoviesListShown={isMoviesListShown} savedMovies={savedMovies} onAddToSaved={onAddToSaved} onRemoveFromSaved={onRemoveFromSaved}/>
    </section>
  );
}

export default SavedMovies;