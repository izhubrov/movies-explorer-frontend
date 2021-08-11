import "./Form.css";

function Form({ children }) {

  function onSubmit() {

  }

  return (
    <form
      className="form"
      onSubmit={onSubmit}
      noValidate
    >
      {children}
    </form>
  );
}

export default Form;