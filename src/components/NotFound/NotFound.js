import React from "react";
import "./NotFound.css";
import { Link, useHistory } from "react-router-dom";

function NotFound() {
  const history = useHistory();

  React.useEffect(()=>{
    localStorage.setItem("route", JSON.stringify("/404"));
  },[])

  function handleClick() {
    history.goBack();
  }
  return (
    <section className="not-found page__container">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link onClick={handleClick} className="not-found__link">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
