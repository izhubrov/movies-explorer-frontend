import "./Register.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import SubmitButton from "../Form/SubmitButton/SubmitButton";
import { NavLink } from 'react-router-dom';

function Register() {
  function handleSignin() {

  }
  return (
    <section className="register page__container">
      <h2 className="register__title">Добро пожаловать!</h2>
      <Form>
        <Name/>
        <Email/>
        <SubmitButton buttonSubmitText="Зарегистрироваться"/>
      </Form>
      <div className="register__container">
        <p className="register__text">Уже зарегистрированы?</p>
        <NavLink onClick={handleSignin} className="register__signin" to={"/signin"}>Войти</NavLink>
      </div>
    </section>
  );
}

export default Register;