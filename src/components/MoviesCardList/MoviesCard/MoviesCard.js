import React from 'react';
import { isMobile } from 'react-device-detect';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';


function MoviesCard({ movie }) {
  const location = useLocation();
  const isLocationSavedMovies = location.pathname === '/saved-movies';

  const [isAddToSaved, setAddToSaved ] = React.useState(false);
  const [isRemoveButtonVisible, setRemoveButtonVisible] = React.useState(false);
  let cardButtonSaveClassName = `movies-card__btn-like ${isAddToSaved ? 'movies-card__btn-like_active appear' : ''}`;

  function handleAddToSaveClick() {
    isAddToSaved ? setAddToSaved(false) : setAddToSaved(true);
  }

  function handleRemoveFromSavedClick() {
    setAddToSaved(false);
  }

  function handleAppearRemoveButton() {
    setRemoveButtonVisible(true);
    return ;
  }

  function handleDisappearRemoveButton() {
    setRemoveButtonVisible(false);
    return ;
  }

  function calculateMovieDuration() {
    const obj = {};
    obj['hours'] = Math.floor(movie.duration / 60);
    obj['minutes'] = movie.duration % 60;
    return obj;
  }

  return (
    <li onMouseOver={handleAppearRemoveButton} onMouseLeave={handleDisappearRemoveButton} className="movies-card appear">
      <img className="movies-card__image" src={process.env.PUBLIC_URL + movie.link} alt={`Изображение ${movie.name}`}/>
      <div className="movies-card__description">
        <div className="movies-card__container">
          <h2 className="movies-card__title text-cut">{movie.name}</h2>
          <div className="movies-card__duration">{`${ calculateMovieDuration().hours !== 0 ? `${calculateMovieDuration().hours}ч ` : "" }${calculateMovieDuration().minutes}м`}</div>
        </div>

        { !isLocationSavedMovies &&
          <button
          type="button"
          aria-label="Добавить в сохраненные"
          className={cardButtonSaveClassName}
          onClick={handleAddToSaveClick}
          ></button>
        }
        { isLocationSavedMovies &&
          <button
            type="button"
            aria-label="Убрать из сохраненных"
            className={`btn-close btn-close_place_saved-movies ${(isRemoveButtonVisible || isMobile) ? "btn-close_active" : ""} `}
            onClick={handleRemoveFromSavedClick}
          ></button>
        }
      </div>
    </li>
  );
}

export default MoviesCard;