import { NavLink } from "react-router-dom";
import "./RedirectBottom.css";

function RedirectBottom({
  authPage,
  authBottomText,
  onbottomLinkClick,
  bottomLinkText,
  onBottomLinkRedirect,
}) {
  return (
    <div className="redirect-bottom">
      {authPage && <p className="redirect-bottom__text">{authBottomText}</p>}
      <NavLink
        onClick={onbottomLinkClick}
        className={`redirect-bottom__link ${
          !authPage ? "redirect-bottom__link_place_profile" : ""
        }`}
        to={onBottomLinkRedirect}
      >
        {bottomLinkText}
      </NavLink>
    </div>
  );
}

export default RedirectBottom;
