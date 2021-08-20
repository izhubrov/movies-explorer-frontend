import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  onSearchMovies,
  onClearInput,
  onFilterMovies,
  onSetFilterToInitial,
  shownMovies,
  onShowMoreMovies,
  isAllMoviesAreShown,
  isErrorMoviesServer,
  isFinishSearching,
  savedMovies,
  onAddToSaved,
  onRemoveFromSaved,
}) {

  React.useEffect(()=>{
    onClearInput();
    onSetFilterToInitial();
  },[]);

  return (
    <section className="movies page__container">
      <SearchForm onSearchMovies={onSearchMovies} onClearInput={onClearInput}/>
      <FilterCheckBox onFilterMovies={onFilterMovies}/>
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
    </section>
  );
}

export default Movies;
