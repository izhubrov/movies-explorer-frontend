import React from 'react';
import "./Email.css";

function Email() {
  const [isFocused, setFocused] = React.useState(false);
  const [isValid, setValid] = React.useState(false || "");

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
      <div className={`form__input-container ${isFocused ? "form__input-container_focused" : ""}`}>
        <div className="form__placeholder">E-mail</div>
        <input
          type="email"
          name="E-mail"
          value={"pochta@yandex.ru"}
          className={`form__input ${!isValid ? "form__input_type_error" : "" }`}
          required
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span className={`form__input-error ${!isValid ? "form__input-error_active" : "" }`}>Что-то пошло не так...</span>
    </label>
  );
}

export default Email;