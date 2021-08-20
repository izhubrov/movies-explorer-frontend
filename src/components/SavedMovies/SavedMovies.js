import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  shownMovies,
  savedMovies,
  onSearchMovies,
  onClearInput,
  onFilterMovies,
  onSetFilterToInitial,
  isFinishSearching,
  onAddToSaved,
  onRemoveFromSaved,
}) {

  React.useEffect(()=>{
    onClearInput();
    onSetFilterToInitial();
  },[]);

  return (
    <section className="saved-movies page__container">
      <SearchForm onSearchMovies={onSearchMovies} onClearInput={onClearInput}/>
      <FilterCheckBox onFilterMovies={onFilterMovies}/>
      {!isFinishSearching && <Preloader />}
      <MoviesCardList
        shownMovies={shownMovies}
        savedMovies={savedMovies}
        onAddToSaved={onAddToSaved}
        onRemoveFromSaved={onRemoveFromSaved}
        isFinishSearching={isFinishSearching}
      />
    </section>
  );
}

export default SavedMovies;
