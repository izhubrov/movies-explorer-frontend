import React from "react";
import "./Email.css";

function Email({ authPage, values, handleChange, errors }) {
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
          E-mail
        </div>
        <input
          type="email"
          name="email"
          value={values.email || ""}
          className={`form__input ${authPage ? "form__input_place_auth" : ""} ${
            errors.email ? "form__input_type_error" : ""
          }`}
          required
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleLeave}
        />
      </div>
      <span
        className={`form__input-error ${
          errors.email ? "form__input-error_active" : ""
        }`}
      >
        {errors.email}
      </span>
    </label>
  );
}

export default Email;
