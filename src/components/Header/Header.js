import React from 'react';
import "./Header.css";
import { useLocation, useHistory } from 'react-router-dom';
import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";
import { NavLink } from 'react-router-dom';


function Header() {
  const location = useLocation();
  const isLocationMain = location.pathname === '/';
  const isLocationRegisterOrLogin = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const history = useHistory();

  return (
    <div className={`${isLocationMain ? "theme-dark" : ""}`}>
      <header className={`header ${isLocationRegisterOrLogin ? "header__auth-location" : ""} page__container`}>
        <NavLink className="header__logo-link" to={"/"}>
          <img
            className="header__logo-image appear"
            src={headerLogo}
            alt="Логотип сайта"
          />
        </NavLink>
        {!isLocationRegisterOrLogin && <Navigation/>}
      </header>
    </div>
  );
}

export default Header;