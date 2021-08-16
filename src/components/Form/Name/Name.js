import React from 'react';
import "./Name.css";

function Name({ authPage, values, handleChange, errors }) {
  const [isFocused, setFocused] = React.useState(false);


  function handleFocus() {
    setFocused(true);
  }

  function handleLeave() {
    setFocused(false);
  }


  return (
    <label className="form__field">
      <div className={`form__input-container ${authPage ? "form__input-container_place_auth" : ""} ${isFocused ? "form__input-container_focused" : ""}`}>
        <div className={`form__placeholder ${authPage ? "form__placeholder_place_auth" : ""}`}>Имя</div>
        <input
          type="text"
          name="name"
          value={values.name || ""}
          className={`form__input ${authPage ? "form__input_place_auth" : ""} ${errors.name ? "form__input_type_error" : "" }`}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span className={`form__input-error ${errors.name ? "form__input-error_active" : "" }`}>{errors.name}</span>
    </label>
  );
}

export default Name;