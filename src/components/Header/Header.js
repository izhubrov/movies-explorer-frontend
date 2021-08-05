import React from 'react';
import "./Header.css";
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import headerLogo from "../../images/logo.svg";
import headerLogoAccount from "../../images/logo-account.svg";


function Header() {
  const location = useLocation();
  const isLocationMain = location.pathname === '/';
  const [isColumnMenu, setColumnMenu] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();


  function handleSignIn() {
    setColumnMenu(false);
    setLoggedIn(true);
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
    <header className={`header page__container ${isLocationMain ? "page_place_main-top" : "header__place_not-main"}`}>
      <img
        className="header__logo appear"
        src={headerLogo}
        alt="Логотип сайта"
        onClick={handleMainPage}
      />
      <div className={`header__outer-container ${isColumnMenu ? "header__overlay header__overlay_type_active" : ""}`}>
        <nav className={`header__nav-container appear ${(!isColumnMenu && isLoggedIn) ? "header__nav-container_type_inactive" : ""} ${isColumnMenu ? "header__nav-container_type_column" : ""} `}>
            {(isLocationMain && !isLoggedIn) ?
            <div className="header__auth-container">
              <NavLink className="header__nav-item" to={"/sign-up"}>Регистрация</NavLink>
              <NavLink onClick={handleSignIn} className="header__nav-item header__nav-item_type_login" to={"/sign-in"}>Войти</NavLink>
            </div>
            :
            <div className={`header__container ${isColumnMenu ? "header__container_type_column" : ""}`}>
              <button onClick={handleCloseMenu} type="button" aria-label="Закрыть меню" className={`btn-close btn-close_place_header ${isColumnMenu ? "btn-close_active" : ""}`}></button>
              <div className={`header__films-container ${isColumnMenu ? "header__films-container_type_column" : ""}`}>
                {isColumnMenu && <NavLink onClick={handleMainPage} className="header__nav-item" activeClassName={isLocationMain ? "header__nav-item_active-column" : ""} to={"/"}>Главная</NavLink>}
                <NavLink onClick={handleMoviesPage} className="header__nav-item" activeClassName={!isColumnMenu ? "header__nav-item_active" : "header__nav-item_active-column"} to={"/movies"}>Фильмы</NavLink>
                <NavLink onClick={handleSavedMoviesPage} className="header__nav-item" activeClassName={!isColumnMenu ? "header__nav-item_active" : "header__nav-item_active-column"} to={"/saved-movies"}>Сохраненные фильмы</NavLink>
              </div>
              <div className={`header__account-container ${isColumnMenu ? "header__account-container_type_column" : ""}`}>
                <NavLink onClick={handleProfilePage}className="header__nav-item" to={"/profile"}>Аккаунт</NavLink>
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
          isLoggedIn &&
          <div onClick={handleMenuClick} className= {`header__btn-menu ${isColumnMenu ? "header__btn-menu_type_inactive" : ""}`}>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
            <div className="header__burger-line"></div>
          </div>
        }

      </div>
    </header>
  );
}

export default Header;