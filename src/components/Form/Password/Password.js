import React from 'react';
import "./Password.css";

function Password({authPage}) {
  const [isFocused, setFocused] = React.useState(false);
  const [isValid, setValid] = React.useState(true);

  function handleChange() {

  }

  function handleFocus() {
    setFocused(true);
  }

  function handleLeave() {
    setFocused(false);
  }


  return (
    <label className="form__field">
      <div className={`form__input-container ${authPage ? "form__input-container_place_auth" : ""} ${isFocused ? "form__input-container_focused" : ""}`}>
        <div className={`form__placeholder ${authPage ? "form__placeholder_place_auth" : ""}`}>Пароль</div>
        <input
          type="password"
          name="Пароль"
          className={`form__input ${authPage ? "form__input_place_auth" : ""} ${!isValid ? "form__input_type_error" : "" }`}
          required
          minLength="8"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span className={`form__input-error ${!isValid ? "form__input-error_active" : "" }`}>Что-то пошло не так...</span>
    </label>
  );
}

export default Password;