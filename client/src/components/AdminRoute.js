import React from 'react';
import {
  Route
} from 'react-router-dom';
import { AuthContainer } from '../state-management';

function AdminRouteHelper ({children, auth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => auth.user && auth.user.role === "ADMIN"
        ? children
        : null }
    />
  )
}

function AdminRoute(props){
  return (
    <AuthContainer component={AdminRouteHelper} {...props}/>
  );
}

export default AdminRoute;
