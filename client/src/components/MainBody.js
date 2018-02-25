import React from 'react';
import AidCardGrid from './AidCardGrid';
import PrivateRoute from './PrivateRoute';
import LoginPanel from './LoginPanel';
import RegistrationPanel from './RegistrationPanel';
import UsersPanel from './UsersPanel';
import AidsPanel from './AidsPanel';
import updateAccountForm from './UpdateAccountForm';

import {
  AidContainer,
  AuthContainer,
  PendingUserContainer,
  ConfirmedUserContainer,
  AidAdminContainer
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
