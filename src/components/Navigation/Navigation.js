import React from 'react';
import "./Navigation.css";
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import navigationLogoAccount from "../../images/logo-account.svg";


function Navigation({ isLoggedIn }) {
  const location = useLocation();
  const isLocationMain = location.pathname === '/';
  const [isColumnMenu, setColumnMenu] = React.useState(false);
  const history = useHistory();

  function handleSignIn() {
    setColumnMenu(false);
  }

  function handleMoviesPage() {
    setColumnMenu(false);
  }

  function handleSavedMoviesPage() {
    setColumnMenu(false);
  }

  function handleMainPage() {
    setColumnMenu(false);
    history.push('/');
  }

  function handleProfilePage() {
    setColumnMenu(false);
  }

  function handleMenuClick() {
    setColumnMenu(true);
  }

  function handleCloseMenu() {
    setColumnMenu(false);
  }

  return (
    <div className={`navigation ${isColumnMenu ? "overlay overlay_active" : ""}`}>
      <nav className={`navigation__container appear ${(!isColumnMenu && isLoggedIn) ? "navigation__container_inactive" : ""} ${isColumnMenu ? "navigation__container_type_column" : ""} `}>
          {!isLoggedIn && isLocationMain &&
            <div className="navigation__auth-container">
              <NavLink className="navigation__item" to={"/sign-up"}>Регистрация</NavLink>
              <NavLink onClick={handleSignIn} className="navigation__item navigation__item_type_login" to={"/sign-in"}>Войти</NavLink>
            </div>
          }
          { isLoggedIn &&
          <div className={`navigation__inner-container ${isColumnMenu ? "navigation__inner-container_type_column" : ""}`}>
            <button onClick={handleCloseMenu} type="button" aria-label="Закрыть меню" className={`btn-close btn-close_place_navigation ${isColumnMenu ? "btn-close_active" : ""}`}></button>
            <div className={`navigation__films-container ${isColumnMenu ? "navigation__films-container_type_column" : ""}`}>
              {isColumnMenu && <NavLink onClick={handleMainPage} className="navigation__item" activeClassName={isLocationMain ? "navigation__item_active-column" : ""} to={"/"}>Главная</NavLink>}
              <NavLink onClick={handleMoviesPage} className="navigation__item" activeClassName={!isColumnMenu ? "navigation__item_active" : "navigation__item_active-column"} to={"/movies"}>Фильмы</NavLink>
              <NavLink onClick={handleSavedMoviesPage} className="navigation__item" activeClassName={!isColumnMenu ? "navigation__item_active" : "navigation__item_active-column"} to={"/saved-movies"}>Сохраненные фильмы</NavLink>
            </div>
            <div className={`navigation__account-container ${isColumnMenu ? "navigation__account-container_type_column" : ""}`}>
              <NavLink onClick={handleProfilePage} className="navigation__item" to={"/profile"}>
                <p>Аккаунт</p>
                <img
                  className="navigation__logo-account appear"
                  src={navigationLogoAccount}
                  alt="Логотип аккаунта"
                />
              </NavLink>
            </div>
          </div>
          }
      </nav>
      {
        isLoggedIn &&
        <div onClick={handleMenuClick} className= {`navigation__btn-menu ${isColumnMenu ? "navigation__btn-menu_inactive" : ""}`}>
          <div className="navigation__burger-line"></div>
          <div className="navigation__burger-line"></div>
          <div className="navigation__burger-line"></div>
        </div>
      }

    </div>
  );
}

export default Navigation;