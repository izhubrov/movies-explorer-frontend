import "./Name.css";

function Name() {
  function handleChange() {

  }

  return (
    <label className="form__field">
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className={`form__input form__input_type_error`}
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span className={`form__input-error form__input-error_active`}></span>
    </label>
  );
}

export default Name;