import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckBox from '../FilterCheckBox/FilterCheckBox';

function Movies() {
  return (
    <section className="movies page__container">
      <SearchForm/>
      <FilterCheckBox/>
    </section>
  );
}

export default Movies;