import React from "react";
import { Route, Switch, Redirect, } from "react-router-dom";
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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import useAuthAndProfile from "../../utils/useAuthAndProfile";
import useSearchAndFilter from "../../utils/useSearchAndFilter";
import useShowMovies from "../../utils/useShowMovies";
import useGetSaveAndRemoveMovies from "../../utils/useGetSaveAndRemoveMovies";
import useErrorPopup from "../../utils/useErrorPopup";
import useDeviceWidthAndHeight from "../../utils/useDeviceWidthAndHeight";

function App() {
  const [isCurrentUser, setCurrentUser] = React.useState({});
  const [isFinishSearching, setIsFinishSearching] = React.useState(null);
  const [moviesItems, setMoviesItems] = React.useState([]);
  const [isErrorMoviesServer, setErrorMoviesServer] = React.useState(null);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);
  const [isNoScrollPage, setIsNoScrollPage] = React.useState(false);
  const { width, handleCheckDeviceWidth, handleChangeDeviceWidth, handleChangeDeviceHeight } =
    useDeviceWidthAndHeight(handleNoScroll);
  const { isError, handleShowError } = useErrorPopup();

  const {
    handleSetMoviesToLocalStorage,
    getSavedMovies,
    handleSaveMovie,
    handleRemoveFromSavedMovie,
  } = useGetSaveAndRemoveMovies({
    savedMovies,
    setMoviesItems,
    setErrorMoviesServer,
    setSavedMovies,
    handleShowError,
  });

  const {
    searchedMoviesItems,
    searchedSavedMoviesItems,
    searchInputValue,
    savedSearchInputValue,
    isShortMoviesFilterOn,
    isShortSavedMoviesFilterOn,
    handleSearchMovies,
    handleSearchSavedMovies,
    handleFilterMovies,
    handleFilterSavedMovies,
    handleSetSearchInputValue,
    handleSetSavedSearchInputValue,
    handleClearSavedMoviesInput,
    setSearchInputValue,
    setSearchedMoviesItems,
    setShortMoviesFilterOn,
    setShortSavedMoviesFilterOn,
    handleFinishSearching,
  } = useSearchAndFilter({
    moviesItems,
    savedMovies,
    setErrorMoviesServer,
    setIsFinishSearching,
  });

  const {
    shownMovies,
    isAllMoviesAreShown,
    setShownMovies,
    handleShowInitialMovies,
    handleShowMoviesInResize,
    handleShowAdditionalMovies,
    checkCountOfShownMovies,
  } = useShowMovies({ width, searchedMoviesItems });

  const {
    isLoggedIn,
    isSuccess,
    handleCheckToken,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleEditProfile,
  } = useAuthAndProfile(
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
  );

  React.useEffect(() => {
    handleCheckToken();
    setMoviesItems(JSON.parse(localStorage.getItem("movies")));
    handleCheckDeviceWidth();
    handleChangeDeviceWidth();
    setShortMoviesFilterOn(
      JSON.parse(localStorage.getItem("isShortMoviesFilterOn")) || false
    );
    setShortSavedMoviesFilterOn(
      JSON.parse(localStorage.getItem("isShortSavedMoviesFilterOn")) || false
    );
    setSearchInputValue("");
  }, []);

  React.useEffect(() => {
    isLoggedIn && getSavedMovies();
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (searchedMoviesItems) {
      if (searchedMoviesItems.length === 0) {
        setShownMovies(searchedMoviesItems);
      } else {
        handleShowInitialMovies();
      }
    }
  }, [searchedMoviesItems]);

  React.useEffect(() => {
    if (shownMovies && shownMovies.length !== 0) {
      checkCountOfShownMovies();
    }
  }, [shownMovies]);

  React.useEffect(() => {
    searchedMoviesItems && shownMovies && handleShowMoviesInResize();
  }, [width]);

  React.useEffect(() => {
    searchInputValue && handleSetMoviesToLocalStorage();
    ((moviesItems && moviesItems.length !== 0) ||
      localStorage.getItem("movies") !== null) &&
      handleSearchMovies();
  }, [moviesItems, searchInputValue, isShortMoviesFilterOn]);

  React.useEffect(() => {
    if (Array.isArray(savedMovies)) {
      handleSearchSavedMovies(savedSearchInputValue);
    }
  }, [isShortSavedMoviesFilterOn, savedSearchInputValue, savedMovies]);

  function handleNoScroll(state) {
    setIsNoScrollPage(state);
  }

  return (
    <div className={`page ${isNoScrollPage ? "page_no-scroll" : ""}`}>
      <CurrentUserContext.Provider value={isCurrentUser}>
        <Header isLoggedIn={isLoggedIn} onNoScroll={handleNoScroll}/>
        <Switch>
          <Route exact path="/">
            <Main isLoading={isLoading} isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/sign-up">
            <Register onSignUp={handleSignUp} isFormDisabled={isFormDisabled}  onNoScroll={handleChangeDeviceHeight}/>
          </Route>
          <Route exact path="/sign-in">
            <Login
              onSignIn={handleSignIn}
              isFormDisabled={isFormDisabled}
              isLoading={isLoading}
              onNoScroll={handleChangeDeviceHeight}
            />
          </Route>
          <ProtectedRoute
            exact
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            onNoScroll={handleChangeDeviceHeight}
            onUpdateUser={handleEditProfile}
            onSignOut={handleSignOut}
            isSuccess={isSuccess}
            isFormDisabled={isFormDisabled}
          />
          <ProtectedRoute
            exact
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            onSearchMovies={handleSetSearchInputValue}
            onFilterMovies={handleFilterMovies}
            isShortMoviesFilterOn={isShortMoviesFilterOn}
            shownMovies={shownMovies}
            onShowMoreMovies={handleShowAdditionalMovies}
            isAllMoviesAreShown={isAllMoviesAreShown}
            isErrorMoviesServer={isErrorMoviesServer}
            isFinishSearching={isFinishSearching}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
            onFinishSearching={handleFinishSearching}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            onSearchMovies={handleSetSavedSearchInputValue}
            onClearInput={handleClearSavedMoviesInput}
            onFilterMovies={handleFilterSavedMovies}
            isErrorMoviesServer={isErrorMoviesServer}
            isShortSavedMoviesFilterOn={isShortSavedMoviesFilterOn}
            shownMovies={searchedSavedMoviesItems}
            savedMovies={savedMovies}
            onAddToSaved={handleSaveMovie}
            onRemoveFromSaved={handleRemoveFromSavedMovie}
          />
          <Route exact path="/404">
            <NotFound/>
          </Route>
          <Redirect to="/404" />
        </Switch>

        <Footer />
        <ErrorPopup errorText={isError.errorText} isActive={isError.isActive} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
