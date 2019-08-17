import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import { AuthContainer } from '../../state-management';


function ManageAccountHelper(props) {
  return (
    <Dropdown item text={props.auth.user ? props.auth.user.name : "Account"}>
      {
        props.auth.user ?
          <Dropdown.Menu>
            <Dropdown.Item onClick={props.logout}>
              Log out
            </Dropdown.Item>
            <Dropdown.Item text='Edit account' onClick={(event, data) => props.history.push("/account")}>
            </Dropdown.Item>
          </Dropdown.Menu>
          :
          <Dropdown.Menu>
            <Dropdown.Item text='Log in' onClick={(event, data) => props.history.push("/login")}>
            </Dropdown.Item>
          </Dropdown.Menu>
      }
    </Dropdown>
  );
}

function ManageAccountMenu(props) {
  return (
    <AuthContainer component={ManageAccountHelper} {...props} />
  );
}

export default ManageAccountMenu;
