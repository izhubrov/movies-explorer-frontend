import "./Login.css";
import Form from "../Form/Form";
import Email from "../Form/Email/Email";
import Password from "../Form/Password/Password";

function Login({ onSubmit }) {
  return (
    <section className="register page__container">
      <Form
        onSubmit={onSubmit}
        authPage={true}
        title={"Рады видеть!"}
        buttonSubmitText="Войти"
        authBottomText="Ещё не зарегистрированы?"
        bottomLinkText="Регистрация"
        onBottomLinkRedirect="/sign-up"
      >
        <Email authPage={true} />
        <Password authPage={true} />
      </Form>
    </section>
  );
}

export default Login;
