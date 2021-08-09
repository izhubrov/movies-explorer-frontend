import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';
import Preloader from '../Preloader/Preloader';

function Movies() {
  return (
    <section className="movies page__container">
      <SearchForm/>
      <FilterCheckBox/>
      <Preloader/>
    </section>
  );
}

export default Movies;