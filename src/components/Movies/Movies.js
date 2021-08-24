import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ArrowTop from "../ArrowTop/ArrowTop";

function Movies({
  onSearchMovies,
  onFilterMovies,
  isShortMoviesFilterOn,
  shownMovies,
  onShowMoreMovies,
  isAllMoviesAreShown,
  isErrorMoviesServer,
  isFinishSearching,
  savedMovies,
  onAddToSaved,
  onRemoveFromSaved,
  isActiveArrowTop,
}) {

  return (
    <section className="movies page__container">
      <SearchForm onSearchMovies={onSearchMovies}/>
      <FilterCheckBox onFilterMovies={onFilterMovies} isShortMoviesFilterOn={isShortMoviesFilterOn}/>
      {!isFinishSearching && <Preloader />}
      <MoviesCardList
        shownMovies={shownMovies}
        onShowMoreMovies={onShowMoreMovies}
        isAllMoviesAreShown={isAllMoviesAreShown}
        isErrorMoviesServer={isErrorMoviesServer}
        isFinishSearching={isFinishSearching}
        savedMovies={savedMovies}
        onAddToSaved={onAddToSaved}
        onRemoveFromSaved={onRemoveFromSaved}
      />
      <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
    </section>
  );
}

export default Movies;
