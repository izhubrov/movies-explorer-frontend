import "./Profile.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";

function Profile({ onSubmit, onSignOut }) {
  return (
    <section className="profile page__container">
      <Form
        onSubmit={onSubmit}
        authPage={false}
        title={"Привет, Виталий!"}
        buttonSubmitText="Редактировать"
        onbottomLinkClick={onSignOut}
        bottomLinkText="Выйти из аккаунта"
        onBottomLinkRedirect="/"
      >
        <Name />
        <Email />
      </Form>
    </section>
  );
}

export default Profile;
