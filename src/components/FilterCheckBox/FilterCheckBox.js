import React from 'react';
import './FilterCheckBox.css';

function FilterCheckBox() {
  return (
    <div className="filter-checkbox">
      <label for="short-film" className="filter-checkbox__container">
        <input type="checkbox" className="filter-checkbox__input" name="short-film" id="short-film" value="true"/>
        <span className="filter-checkbox__pseudo-item"></span>
        <span className="filter-checkbox__text">Короткометражки</span>
      </label>
    </div>
  );
}

export default FilterCheckBox;