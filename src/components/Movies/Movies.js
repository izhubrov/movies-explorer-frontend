import React from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ArrowTop from "../ArrowTop/ArrowTop";
import useArrowTop from "../../utils/useArrowTop";

function Movies({
  onSearchMovies,
  onFilterMovies,
  isShortMoviesFilterOn,
  shownMovies,
  onShowMoreMovies,
  isAllMoviesAreShown,
  isErrorMoviesServer,
  isFinishSearching,
  onFinishSearching,
  savedMovies,
  onAddToSaved,
  onRemoveFromSaved,
}) {

  const {isActiveArrowTop, checkArrowTop } = useArrowTop();

  React.useEffect(() => {
    window.addEventListener("scroll", checkArrowTop);
    return () => {
      window.removeEventListener("scroll", checkArrowTop);
    };
  }, []);

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
        onFinishSearching={onFinishSearching}
      />
      <ArrowTop isActiveArrowTop={isActiveArrowTop}></ArrowTop>
    </section>
  );
}

export default Movies;
