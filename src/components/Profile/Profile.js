import "./Profile.css";
import Form from "../Form/Form";
import Name from "../Form/Name/Name";
import Email from "../Form/Email/Email";
import SubmitButton from "../Form/SubmitButton/SubmitButton";

function Profile() {
  return (
    <section className="profile page__container">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <Form>
        <Name/>
        <Email/>
        <SubmitButton/>
      </Form>
    </section>
  );
}

export default Profile;