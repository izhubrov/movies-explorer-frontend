import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
  const path = localStorage.getItem("route");
  console.log('сюда');
  console.log(props.isLoggedIn);
  return (
    <Route>
      {() => {
        // if (path === "/404") {
        //  return history.goBack();
        // }
        if (props.isLoggedIn || path) {
          if (path === '/sign-in' || path === '/sign-up') {
            return <Redirect to="/movies" />
          } else {
            return <Component {...props}/>
          }
        } else {
          return <Redirect to="/sign-in" />
        }
      }}
    </Route>
  );
}

export default ProtectedRoute;
