import React from "react";
import "./FilterCheckBox.css";

function FilterCheckBox({ onFilterMovies, isShortMoviesFilterOn }) {
  const [checked, setChecked] = React.useState("");

  function handleSetCheckbox() {
    onFilterMovies();
  }

  React.useEffect(()=>{
    isShortMoviesFilterOn ? setChecked("checked") : setChecked("");
  },[isShortMoviesFilterOn])

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          name="short-film"
          id="short-film"
          value="true"
          onChange={handleSetCheckbox}
          checked={checked}
        />
        <span
          className="filter-checkbox__pseudo-item"
        ></span>
        <span className="filter-checkbox__text">
          Короткометражки
        </span>
      </label>
    </div>
  );
}

export default FilterCheckBox;
