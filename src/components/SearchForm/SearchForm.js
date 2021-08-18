import React from "react";
import "./SearchForm.css";
import ErrorSearchForm from "./ErrorSearchForm/ErrorSearchForm";

function SearchForm({onSearchMovies}) {
  const [isFocused, setFocused] = React.useState(false);
  const [isEmptyQuery, setEmptyQuery] = React.useState(false);
  const [searchedMovieInput, setSearchedMovieInput] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    const searchedMovie = searchedMovieInput.trim();
    if (searchedMovie.length === 0) {
      setEmptyQuery(true);
      setTimeout(()=>setEmptyQuery(false),3000);
    } else {
      setEmptyQuery(false);
      onSearchMovies(searchedMovie);
    }
  }

  function handleChange(evt) {
    setSearchedMovieInput(evt.target.value);
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
          className="search-form__btn-submit"
        >
        </button>
      </label>
      <ErrorSearchForm isEmptyQuery={isEmptyQuery} />
    </form>
  );
}

export default SearchForm;
