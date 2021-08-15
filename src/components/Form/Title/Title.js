import "./Title.css";

function Title({ authPage, title }) {
  return (
    <h2 className={`form-title ${!authPage ? "form-title_place_profile" : ""}`}>
      {title}
    </h2>
  );
}

export default Title;
