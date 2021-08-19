import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from '../Preloader/Preloader';
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ onSearchMovies, shownMovies, onShowMoreMovies, isAllMoviesAreShown, isErrorMoviesServer, isFinishSearching, savedMovies, onAddToSaved, onRemoveFromSaved }) {
  return (
    <section className="movies page__container">
      <SearchForm onSearchMovies={onSearchMovies}/>
      <FilterCheckBox />
      {shownMovies.length === 0 && <Preloader/>}
      <MoviesCardList shownMovies={shownMovies} onShowMoreMovies={onShowMoreMovies} isAllMoviesAreShown={isAllMoviesAreShown} isErrorMoviesServer={isErrorMoviesServer} isFinishSearching={isFinishSearching} savedMovies={savedMovies} onAddToSaved={onAddToSaved} onRemoveFromSaved={onRemoveFromSaved}/>
    </section>
  );
}

export default Movies;
