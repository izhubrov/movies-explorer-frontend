import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ArrowTop from "../ArrowTop/ArrowTop";

function SavedMovies({
  shownMovies,
  savedMovies,
  onSearchMovies,
  onClearInput,
  onFilterMovies,
  isShortSavedMoviesFilterOn,
  isFinishSearching,
  onAddToSaved,
  onRemoveFromSaved,
  isActiveArrowTop
}) {

  React.useEffect(()=>{
    onClearInput();
  },[]);

  return (
    <section className="saved-movies page__container">
      <SearchForm onSearchMovies={onSearchMovies} onClearInput={onClearInput}/>
      <FilterCheckBox onFilterMovies={onFilterMovies} isShortSavedMoviesFilterOn={isShortSavedMoviesFilterOn}/>
      {!isFinishSearching && <Preloader />}
      <MoviesCardList
        shownMovies={shownMovies}
        savedMovies={savedMovies}
        onAddToSaved={onAddToSaved}
        onRemoveFromSaved={onRemoveFromSaved}
        isFinishSearching={isFinishSearching}
      />
      <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
    </section>
  );
}

export default SavedMovies;
