import "./Form.css";

function Form({ children, authPage }) {

  function onSubmit() {

  }

  return (
    <form
      className={`form ${authPage ? "form__auth-page" : ""} `}
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
}

export default Form;