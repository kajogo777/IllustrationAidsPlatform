import React from 'react';
import AidCardGrid from './AidCardGrid';
import LoginForm from './LoginForm';
import PrivateRoute from './PrivateRoute';
import LoginPanel from './LoginPanel';
import RegistrationPanel from './RegistrationPanel';

import {
  AidContainer,
  AuthContainer,
  UserContainer
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
            <UserContainer component={RegistrationPanel}/>
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
