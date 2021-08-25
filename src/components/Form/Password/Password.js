import React from "react";
import "./Password.css";

function Password({ authPage, values, handleChange, errors }) {
  const [isFocused, setFocused] = React.useState(false);

  function handleFocus() {
    setFocused(true);
  }

  function handleLeave() {
    setFocused(false);
  }

  return (
    <label className="form__field">
      <div
        className={`form__input-container ${
          authPage ? "form__input-container_place_auth" : ""
        } ${isFocused ? "form__input-container_focused" : ""}`}
      >
        <div
          className={`form__placeholder ${
            authPage ? "form__placeholder_place_auth" : ""
          }`}
        >
          Пароль
        </div>
        <input
          type="password"
          name="password"
          value={values.password || ""}
          className={`form__input ${authPage ? "form__input_place_auth" : ""} ${
            errors.password ? "form__input_type_error" : ""
          }`}
          required
          minLength="8"
          autoComplete="on"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span
        className={`form__input-error ${
          errors.password ? "form__input-error_active" : ""
        }`}
      >
        {errors.password}
      </span>
    </label>
  );
}

export default Password;
