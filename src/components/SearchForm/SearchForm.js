import React from "react";
import "./SearchForm.css";

function SearchForm() {

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <form
      className="search-form"
      name="search-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="search-form__field">
        <input
          type="text"
          name="film"
          placeholder="Фильм"
          className="search-form__input"
          required
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
