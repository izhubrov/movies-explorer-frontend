import React from "react";
import "./FilterCheckBox.css";
import {useLocation} from 'react-router-dom';

function FilterCheckBox({ onFilterMovies, isShortMoviesFilterOn, isShortSavedMoviesFilterOn }) {
  const [isFilterOn, setFilterOn] = React.useState(false);
  const location = useLocation();
  const locationMovies = location.pathname === '/movies';

  function handleSetCheckbox() {
    onFilterMovies();
    setFilterOn(!isFilterOn);
  }

  React.useEffect(()=>{
    if (locationMovies) {
      isShortMoviesFilterOn ? setFilterOn(true) : setFilterOn(false);
    } else {
      isShortSavedMoviesFilterOn ? setFilterOn(true) : setFilterOn(false);
    }

  },[])

  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__container">
        <input
          type="checkbox"
          className="filter-checkbox__input"
          name="short-film"
          id="short-film"
          value={isFilterOn}
          onChange={handleSetCheckbox}
          checked={isFilterOn}
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
