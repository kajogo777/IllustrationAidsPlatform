import React from 'react';
import AidCardGrid from './aid-module/AidCardGrid';
import PrivateRoute from './PrivateRoute';
import LoginPanel from './account-module/LoginPanel';
import RegistrationPanel from './account-module/RegistrationPanel';
import UsersPanel from './user-module/UsersPanel';
import AidsPanel from './aid-module/AidsPanel';
import ReservationsPanel from './reservation-module/ReservationsPanel';
import updateAccountForm from './account-module/UpdateAccountForm';

import {
  AidContainer,
  AuthContainer,
  PendingUserContainer,
  ConfirmedUserContainer,
  AidAdminContainer,
  ReservationAdminContainer
} from '../state-management';
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import PromptBanner from './PromptBanner';

class MainBody extends React.Component{
  render(){
    return(
      <div>
        <br/>
        <PromptBanner/>
        <br/>
        <Switch>

          <PrivateRoute path="/aidgrid">
            <AidContainer component={AidCardGrid}/>
          </PrivateRoute>

          <PrivateRoute path="/registration">
            <PendingUserContainer component={RegistrationPanel}/>
          </PrivateRoute>

          <PrivateRoute path="/users">
            <ConfirmedUserContainer component={UsersPanel}/>
          </PrivateRoute>

          <PrivateRoute path="/aids">
            <AidAdminContainer component={AidsPanel}/>
          </PrivateRoute>

          <PrivateRoute path="/reservations">
            <ReservationAdminContainer component={ReservationsPanel}/>
          </PrivateRoute>

          <PrivateRoute path="/account">
            <AuthContainer component={updateAccountForm}/>
          </PrivateRoute>

          <Route path="/login" render={()=>
            <LoginPanel/>
          } />

          <Redirect from="/" to="/aidgrid" />

        </Switch>
      </div>
    );
  }
}

export default MainBody;
