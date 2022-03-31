import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  return (
    props.isLoggedIn !== null &&
    <Route>
      {() => props.isLoggedIn ? <Component {...props}/> : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;
