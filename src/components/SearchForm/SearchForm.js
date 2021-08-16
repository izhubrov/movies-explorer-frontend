import React from "react";
import "./SearchForm.css";

function SearchForm() {
  const [isFocused, setFocused] = React.useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
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
          placeholder="Фильм"
          className="search-form__input"
          required
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
        <button
          type="submit"
          className="search-form__btn-submit"
        >
        </button>
      </label>

    </form>
  );
}

export default SearchForm;
