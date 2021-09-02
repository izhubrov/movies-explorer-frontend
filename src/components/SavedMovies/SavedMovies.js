import React from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ArrowTop from "../ArrowTop/ArrowTop";
import useArrowTop from "../../utils/useArrowTop";

function SavedMovies({
  shownMovies,
  savedMovies,
  onSearchMovies,
  onClearInput,
  onFilterMovies,
  isErrorMoviesServer,
  isShortSavedMoviesFilterOn,
  onAddToSaved,
  onRemoveFromSaved,
}) {

  const {isActiveArrowTop, checkArrowTop } = useArrowTop();

  React.useEffect(()=>{
    localStorage.setItem("route", JSON.stringify("/saved-movies"));
    onClearInput();
    window.addEventListener("scroll", checkArrowTop);
    return () => {
      window.removeEventListener("scroll", checkArrowTop);
    };
  },[]);

  return (
    <section className="saved-movies page__container">
      <SearchForm onSearchMovies={onSearchMovies} onClearInput={onClearInput}/>
      <FilterCheckBox onFilterMovies={onFilterMovies} isShortSavedMoviesFilterOn={isShortSavedMoviesFilterOn}/>
      <MoviesCardList
        shownMovies={shownMovies}
        savedMovies={savedMovies}
        onAddToSaved={onAddToSaved}
        isErrorMoviesServer={isErrorMoviesServer}
        onRemoveFromSaved={onRemoveFromSaved}
      />
      <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
    </section>
  );
}

export default SavedMovies;
