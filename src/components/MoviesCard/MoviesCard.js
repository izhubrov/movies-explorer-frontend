import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {

  // const isLiked = movie.likes.some((userWhoLiked)=>userWhoLiked._id === currentUser._id);
  // const cardButtonSaveClassName = `cards__btn-like ${isLiked ? 'cards__btn-like_active appear': ''}`;

  const [isAddToSaved, setAddToSaved ] = React.useState(false);
  const cardButtonSaveClassName = `movies-card__btn-like ${isAddToSaved ? 'movies-card__btn-like_active appear' : ''}`;

  function handleAddToSaveClick() {
    setAddToSaved(true);
  }

  // function handleRemoveFromSavedClick() {
  //   setAddToSaved(false);
  // }

  return (
    <li className="movies-card appear">
      <img className="movies-card__image" src={process.env.PUBLIC_URL + movie.link} alt={`Изображение ${movie.name}`}/>
      <div className="movies-card__description">
        <div className="movies-card__container">
          <h2 className="movies-card__title text-cut">{movie.name}</h2>
          <div className="movies-card__duration">{`${movie.duration}`}</div>
        </div>

        <button
          type="button"
          aria-label="Добавить в сохраненные"
          className={cardButtonSaveClassName}
          onClick={handleAddToSaveClick}
        ></button>
        {/* <button
          type="button"
          aria-label="Убрать из сохраненных"
          className={cardButtonRemoveSaveClassName}
          onClick={handleRemoveFromSavedClick}
        ></button> */}
      </div>
    </li>
  );
}

export default MoviesCard;