import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <section className="not-found page__container">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <button type="button" onClick={handleClick} aria-label="Назад" className="not-found__link">
        Назад
      </button>
    </section>
  );
}

export default NotFound;
