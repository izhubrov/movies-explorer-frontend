import React from 'react';
import './FilterCheckBox.css';

function FilterCheckBox({onFilterMovies}) {

  function handleSetCheckbox() {
    onFilterMovies();
  }

  return (
    <div className="filter-checkbox" >
      <label className="filter-checkbox__container">
        <input type="checkbox" className="filter-checkbox__input" name="short-film" id="short-film" value="true"/>
        <span className="filter-checkbox__pseudo-item" onClick={handleSetCheckbox}></span>
        <span className="filter-checkbox__text" onClick={handleSetCheckbox}>Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckBox;