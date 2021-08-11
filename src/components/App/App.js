import React from "react";
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Form/Login/Login";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";

function App() {
  const history = useHistory();

  React.useEffect(()=>{
    history.push("/");
  },[]);

  return (
    <div className="page">
        <Header
        />
        <Switch>
          <Route exact path="/">
            <Main
            />
          </Route>
          <Route path="/sign-up">
            <Register
            />
          </Route>
          <Route path="/sign-in">
            <Login
            />
          </Route>
          <Route path="/profile">
            <Profile
            />
          </Route>
          <Route path="/movies">
            <Movies/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies/>
          </Route>
        </Switch>
        <Footer
        />
    </div>
  );
}

export default App;
