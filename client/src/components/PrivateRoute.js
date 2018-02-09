import React from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import { AuthContainer } from '../state-management';

function PrivateRouteHelper ({children, auth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => auth.user
        ? children
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute(props){
  return (
    <AuthContainer component={PrivateRouteHelper} {...props}/>
  );
}

export default PrivateRoute;
