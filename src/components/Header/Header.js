import React from 'react';
import "./Header.css";
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import headerLogo from "../../images/logo.svg";
import headerLogoAccount from "../../images/logo-account.svg";


function Header() {
  const location = useLocation();
  const isLocationSignIn = location.pathname === '/sign-in';
  const isLocationMain = location.pathname === '/';
  const [isColumnMenu, setColumnMenu] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

 function handleLogOut() {
    setColumnMenu(false);
  }

  function handleSignIn() {
    history.push('/sign-in');
  }

  function handleMenuClick() {
    setColumnMenu(true);
  }

  function handleCloseMenu() {
    setColumnMenu(false);
  }

  React.useEffect(()=>{
    setColumnMenu(false);
    setLoggedIn(false);
  },[])

  return (
    <header className={`header  ${!isColumnMenu ? "page__container" : ""} ${isColumnMenu ? "header_columned" : ""} ${isLocationMain ? "page_place_main-top" : "header__place_not-main"}`}>
      <img
        className="header__logo appear"
        src={headerLogo}
        alt="Логотип сайта"
      />
      <nav className={`header__nav-container appear ${isLoggedIn && !isColumnMenu ? "header__nav-container_type_inactive" : ""} ${isColumnMenu ? "header__nav-container_type_column" : ""} `}>
          {isLocationMain ?
          <div className="header__auth-container">
            <NavLink className="header__nav-item" to={"/sign-up"}>{!isLoggedIn ? "Регистрация" : ""}</NavLink>
            <NavLink onClick={handleSignIn} className="header__nav-item header__nav-item_type_login" to={"/sign-in"}>{!isLoggedIn ? "Войти" : ""}</NavLink>
          </div>
          :
          <div className="header__container">
            <div className="header__films-container">
              <NavLink onClick={!isLoggedIn ? handleSignIn : handleLogOut} className={`header__nav-item ${isLocationMain ? "header__nav-item_active" : ""}`} to={"/movies"}>Фильмы</NavLink>
              <NavLink className="header__nav-item" to={"/saved-movies"}>Сохраненные фильмы</NavLink>
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
      {/* <div onClick={handleMenuClick} className= {`header__btn-menu ${(!isLoggedIn || isColumnMenu) ? "header__btn-menu_type_inactive" : ""}`}>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
      </div>
      <button onClick={handleCloseMenu} type="button" aria-label="Закрыть меню" className={`btn-close btn-close_place_header ${isColumnMenu ? "btn-close_active" : ""}`}></button> */}

    </header>
  );
}

export default Header;