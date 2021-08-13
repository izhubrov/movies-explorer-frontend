import React from 'react';
import "./Name.css";

function Name() {
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
        <div className="form__placeholder">Имя</div>
        <input
          type="text"
          name="name"
          value={"Виталий"}
          className={`form__input ${!isValid ? "form__input_type_error" : "" }`}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span className={`form__input-error ${!isValid ? "form__input-error_active" : "" }`}>Что-то пошло не так...</span>
    </label>
  );
}

export default Name;