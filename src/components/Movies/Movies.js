import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ moviesListShown, onShowMoreMovies, allMoviesAreShown }) {
  return (
    <section className="movies page__container">
      <SearchForm />
      <FilterCheckBox />
      {/* <Preloader/> */}
      <MoviesCardList moviesListShown={moviesListShown} onShowMoreMovies={onShowMoreMovies} allMoviesAreShown={allMoviesAreShown}/>
    </section>
  );
}

export default Movies;
