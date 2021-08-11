import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <section className="saved-movies page__container">
      <SearchForm/>
      <FilterCheckBox/>
      {/* <Preloader/> */}
      <MoviesCardList/>
    </section>
  );
}

export default SavedMovies;