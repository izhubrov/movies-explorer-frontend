import "./Register.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import Password from "../Form/Password/Password";

function Register({ onSubmit }) {
  return (
    <section className="register page__container">
      <Form
        onSubmit={onSubmit}
        authPage={true}
        title={"Добро пожаловать!"}
        buttonSubmitText="Зарегистрироваться"
        authBottomText="Уже зарегистрированы?"
        bottomLinkText="Войти"
        onBottomLinkRedirect="/sign-in"
      >
        <Name authPage={true} />
        <Email authPage={true} />
        <Password authPage={true} />
      </Form>
    </section>
  );
}

export default Register;
