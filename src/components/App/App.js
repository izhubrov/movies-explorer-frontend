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
import Login from "../Login/Login";
import Footer from "../Footer/Footer";



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
          <Route path="/">
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
        </Switch>
        <Footer
        />
    </div>
  );
}

export default App;
