import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import movies from "../../utils/utils";
let numberOfPackages = 0;

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [moviesListShown, setMoviesListShown] = React.useState([]);
  const [allMoviesAreShown, setAllMoviesAreShown] = React.useState(false);

  React.useEffect(() => {
    setMoviesListShown(movies.filter((movie, index) => index < 12));
  }, []);

  React.useEffect(()=>{
    checkCountOfShownMovies();
  },[moviesListShown]);

  function handleShowMovies() {
    numberOfPackages++;
    setMoviesListShown([
      ...moviesListShown,
      ...movies.filter(
        (movie, index) =>
          index >= (12 * numberOfPackages) && index < (12 * (numberOfPackages + 1))
      ),
    ]);
  }

  function checkCountOfShownMovies() {
    if (moviesListShown.length === movies.length) setAllMoviesAreShown(true);
  }

  function handleSignIn() {
    setIsLoggedIn(true);
    history.push("/movies");
  }

  function handleSignUp() {
    handleSignIn();
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    history.push("/");
  }

  function handleEditProfile() {}

  return (
    <div className="page">
      <Header isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/sign-up">
          <Register onSubmit={handleSignUp} />
        </Route>
        <Route exact path="/sign-in">
          <Login onSubmit={handleSignIn} />
        </Route>
        <Route exact path="/profile">
          <Profile onSubmit={handleEditProfile} onSignOut={handleSignOut} />
        </Route>
        <Route exact path="/movies">
          <Movies moviesListShown={moviesListShown} onShowMoreMovies={handleShowMovies} allMoviesAreShown={allMoviesAreShown} />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies moviesListShown={moviesListShown}/>
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>

      <Footer />

      <ErrorPopup errorText={"Некорректно введен адрес электронной почты"} isActive={false} />
    </div>
  );
}

export default App;
