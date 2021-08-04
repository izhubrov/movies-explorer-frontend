import React from 'react';
import "./Header.css";
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import headerLogo from "../../images/logo.svg";
import headerLogoAccount from "../../images/logo-account.svg";


function Header() {
  const location = useLocation();
  const isLocationMain = location.pathname === '/';
  const [isColumnMenu, setColumnMenu] = React.useState(false);
  const history = useHistory();


  function handleSignIn() {
  }

  function handleMovies() {
  }

  function handleSavedMovies() {
  }

  function handleMainPage() {
    history.push('/');
  }


  function handleMenuClick() {
    setColumnMenu(true);
  }

  function handleCloseMenu() {
    setColumnMenu(false);
  }

  return (
    <header className={`header  ${!isColumnMenu ? "page__container" : ""} ${isLocationMain ? "page_place_main-top" : "header__place_not-main"}`}>
      <img
        className="header__logo appear"
        src={headerLogo}
        alt="Логотип сайта"
        onClick={handleMainPage}
      />
      <nav className={`header__nav-container appear ${(!isColumnMenu && !isLocationMain) ? "header__nav-container_type_inactive" : ""} ${isColumnMenu ? "header__nav-container_type_column" : ""} `}>
          {isLocationMain ?
          <div className="header__auth-container">
            <NavLink className="header__nav-item" to={"/sign-up"}>Регистрация</NavLink>
            <NavLink onClick={handleSignIn} className="header__nav-item header__nav-item_type_login" to={"/sign-in"}>Войти</NavLink>
          </div>
          :
          <div className={`header__container ${isColumnMenu ? "header__container_type_column" : ""}`}>
            <button onClick={handleCloseMenu} type="button" aria-label="Закрыть меню" className={`btn-close btn-close_place_header ${isColumnMenu ? "btn-close_active" : ""}`}></button>
            <div className={`header__films-container ${isColumnMenu ? "header__films-container_type_column" : ""}`}>
              <NavLink onClick={handleMainPage} className={`header__nav-item ${!isColumnMenu ? "header__nav-item_type_inactive" : ""}`} activeClassName={!isColumnMenu? "header__nav-item_active" : "header__nav-item_active-column"} to={"/"}>Главная</NavLink>
              <NavLink onClick={handleMovies} className="header__nav-item" activeClassName={!isColumnMenu? "header__nav-item_active" : "header__nav-item_active-column"} to={"/movies"}>Фильмы</NavLink>
              <NavLink onClick={handleSavedMovies} className="header__nav-item" activeClassName={!isColumnMenu? "header__nav-item_active" : "header__nav-item_active-column"} to={"/saved-movies"}>Сохраненные фильмы</NavLink>
            </div>
            <div className="header__account-container">
              <NavLink className="header__nav-item" to={"/profile"}>Аккаунт</NavLink>
              <img
                className="header__logo-account appear"
                src={headerLogoAccount}
                alt="Логотип аккаунта"
              />
            </div>
          </div>
          }
      </nav>
      {
        !isLocationMain &&
        <div onClick={handleMenuClick} className= {`header__btn-menu ${isLocationMain && isColumnMenu ? "header__btn-menu_type_inactive" : ""}`}>
          <div className="header__burger-line"></div>
          <div className="header__burger-line"></div>
          <div className="header__burger-line"></div>
        </div>
      }

    </header>
  );
}

export default Header;