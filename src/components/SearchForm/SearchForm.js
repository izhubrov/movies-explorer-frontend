import React from "react";
import { useLocation } from "react-router";
import "./SearchForm.css";
import ErrorSearchForm from "./ErrorSearchForm/ErrorSearchForm";


function SearchForm({ onSearchMovies, onClearInput }) {
  const [isFocused, setFocused] = React.useState(false);
  const [isEmptyQuery, setEmptyQuery] = React.useState(false);
  const [searchedMovieInput, setSearchedMovieInput] = React.useState('');
  const [isClearInput, setClearInput] = React.useState(false);
  const location = useLocation();
  const isLocationSavedMovies = location.pathname === '/saved-movies';

  function handleSubmit(evt) {
    evt.preventDefault();
    const searchedMovie = searchedMovieInput.trim();
    if (!isClearInput) {
      if (searchedMovie.length === 0) {
        setEmptyQuery(true);
        setSearchedMovieInput("");
        setTimeout(()=>setEmptyQuery(false),3000);
      } else {
        setEmptyQuery(false);
        onSearchMovies(searchedMovie);
        setClearInput(true);
      }
    } else {
      setSearchedMovieInput("");
      setClearInput(false);
      if(isLocationSavedMovies) onClearInput();
    }
  }

  function handleChange(evt) {
    setSearchedMovieInput(evt.target.value);
    setClearInput(false);
  }

  function handleFocus() {
    setFocused(true);
  }

  function handleLeave() {
    setFocused(false);
  }

  return (
    <form
      className="search-form"
      name="search-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className={`search-form__field ${isFocused ? "search-form__field_focused" : ""}`}>
        <input
          type="text"
          name="film"
          value={searchedMovieInput}
          placeholder="Фильм"
          className="search-form__input"
          required
          onFocus={handleFocus}
          onBlur={handleLeave}
          onChange={handleChange}
        />
        <button
          type="submit"
          className={`${!isClearInput ? "search-form__btn-submit" : "btn-close btn-close_place_search-form btn-close_active"}`}
        >
        </button>
      </label>
      <ErrorSearchForm isEmptyQuery={isEmptyQuery} />
    </form>
  );
}

export default SearchForm;
