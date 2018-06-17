import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import {
  Card,
  Tab
} from 'semantic-ui-react';

import {
  RegisterContainer,
  AuthContainer
} from '../../state-management';

const panes = [
  { menuItem: 'Login', render: () => <Tab.Pane><AuthContainer component={LoginForm}/></Tab.Pane> },
  { menuItem: 'Register', render: () => <Tab.Pane><RegisterContainer component={RegisterForm}/></Tab.Pane> },
]

//<Tab panes={panes}  menu={{ widths: 2, tabular: true }} /> centered menu
function LoginPanel(props){
  return(
    <Card centered>
     <Tab panes={panes}  />
    </Card>
  );
}

export default LoginPanel;
