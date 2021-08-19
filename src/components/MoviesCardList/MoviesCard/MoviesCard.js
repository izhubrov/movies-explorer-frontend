import React from "react";
import { isMobile } from "react-device-detect";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { serverUrl } from "../../../utils/utils";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function MoviesCard({ movie, savedMovies, onAddToSaved, onRemoveFromSaved }) {
  const location = useLocation();
  const isLocationSavedMovies = location.pathname === "/saved-movies";
  const [isRemoveButtonVisible, setRemoveButtonVisible] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const isSaved = savedMovies.find(
    (item) => item.movieId === movie.id && item.owner === currentUser._id
  );

  let cardButtonSaveClassName = `movies-card__btn-like ${
    isSaved ? "movies-card__btn-like_active appear" : ""
  }`;

  function handleAddToSaveClick() {
    return !isSaved ? onAddToSaved(movie) : handleRemoveFromSavedClick();
  }

  function handleRemoveFromSavedClick() {
    onRemoveFromSaved(movie.id || movie.movieId);
  }

  function handleAppearRemoveButton() {
    setRemoveButtonVisible(true);
    return;
  }

  function handleDisappearRemoveButton() {
    setRemoveButtonVisible(false);
    return;
  }

  function calculateMovieDuration() {
    const obj = {};
    obj["hours"] = Math.floor(movie.duration / 60);
    obj["minutes"] = movie.duration % 60;
    return obj;
  }

  return (
    <li
      onMouseOver={handleAppearRemoveButton}
      onMouseLeave={handleDisappearRemoveButton}
      className="movies-card appear"
    >
      <a
        className="movies-card__trailer-link"
        href={movie.trailerLink || movie.trailer}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="movies-card__image"
          src={`${!isLocationSavedMovies ? serverUrl+movie.image.url : movie.image}`}
          alt={`Изображение ${movie.nameRU}`}
        />
        <span className="movies-card__tag">Смотреть трейлер</span>
        <div className="movies-card__overlay"></div>
      </a>
      <div className="movies-card__description">
        <div className="movies-card__container">
          <h2 className="movies-card__title text-cut">{movie.nameRU}</h2>
          <div className="movies-card__duration">{`${
            calculateMovieDuration().hours !== 0
              ? `${calculateMovieDuration().hours}ч `
              : ""
          }${
            calculateMovieDuration().minutes !== 0
              ? `${calculateMovieDuration().minutes}м`
              : ""
          }`}</div>
        </div>

        {!isLocationSavedMovies && (
          <button
            type="button"
            aria-label="Добавить в сохраненные"
            className={cardButtonSaveClassName}
            onClick={handleAddToSaveClick}
          ></button>
        )}
        {isLocationSavedMovies && (
          <button
            type="button"
            aria-label="Убрать из сохраненных"
            className={`btn-close btn-close_place_saved-movies ${
              isRemoveButtonVisible || isMobile ? "btn-close_active" : ""
            } `}
            onClick={handleRemoveFromSavedClick}
          ></button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;
