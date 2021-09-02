import React from "react";
import { useLocation, useHistory } from "react-router";
import mainApi from "./mainApi";

export default function useAuthAndProfile(
  setIsLoading,
  setCurrentUser,
  handleShowError,
  setIsFormDisabled,
  isCurrentUser,
  setMoviesItems,
  setSavedMovies,
  setSearchedMoviesItems,
  setShownMovies,
  setSearchInputValue,
  setShortMoviesFilterOn,
  setIsFinishSearching
) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(null);
  const [isSuccess, setSuccess] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  function handleCheckToken() {
    setIsLoading(true);
    mainApi
      .checkToken()
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        setIsLoggedIn(true);
        setIsFinishSearching(false);
        setShownMovies(null);
        setMoviesItems([]);
        setSavedMovies([]);
        if (
          location.pathname === "/sign-up" ||
          location.pathname === "/sign-in"
        ) {
          history.push("/movies");
        } else {
          history.push(location.pathname);
        }
      })
      .catch(async (err) => {
        setIsLoading(false);
        if (isLoggedIn !== null) {
          await handleShowError(err);
        }
      });
  }

  function handleSignIn(data) {
    setIsFormDisabled(true);
    mainApi
      .signIn(data)
      .then(() => {
        handleCheckToken();
        setIsFormDisabled(false);
      })
      .catch(async (err) => {
        await handleShowError(err);
        setIsFormDisabled(false);
      });
  }

  function handleSignUp(data) {
    setIsFormDisabled(true);
    mainApi
      .signUp(data)
      .then((res) => {
        setCurrentUser(res);
        handleSignIn(data);
        setIsFormDisabled(false);
      })
      .catch(async (err) => {
        await handleShowError(err);
        setIsFormDisabled(false);
      });
  }

  function handleSignOut() {
    mainApi
      .signOut(isCurrentUser.email)
      .then(() => {
        setIsLoggedIn(null);
        history.push("/");
        setIsLoading(false);
        setCurrentUser({ email: "", password: "", name: "" });
        setMoviesItems([]);
        setSavedMovies([]);
        setSearchedMoviesItems([]);
        setShownMovies([]);
        setSearchInputValue("");
        setShortMoviesFilterOn(false);
        localStorage.removeItem("isShortMoviesFilterOn");
        localStorage.removeItem("isShortSavedMoviesFilterOn");
        localStorage.removeItem("searchedMovies");
        localStorage.removeItem("movies");
        localStorage.removeItem("route");
      })
      .catch(async (err) => {
        await handleShowError(err);
      });
  }

  function handleEditProfile(data) {
    setIsFormDisabled(true);
    mainApi
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setIsFormDisabled(false);
      })
      .catch(async (err) => {
        await handleShowError(err);
        setIsFormDisabled(false);
      });
  }

  return {
    isLoggedIn,
    isSuccess,
    handleCheckToken,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleEditProfile,
  };
}
