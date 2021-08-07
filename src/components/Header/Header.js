import React from 'react';
import "./Header.css";
import { useLocation, useHistory } from 'react-router-dom';
import headerLogo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";


function Header() {
  const location = useLocation();
  const isLocationMain = location.pathname === '/';
  const history = useHistory();

  function handleMainPage() {
    history.push('/');
  }

  return (
    <div className={`${isLocationMain ? "theme-dark" : ""}`}>
      <header className="header page__container">
        <img
          className="header__logo appear"
          src={headerLogo}
          alt="Логотип сайта"
          onClick={handleMainPage}
        />
        <Navigation/>
      </header>
    </div>
  );
}

export default Header;