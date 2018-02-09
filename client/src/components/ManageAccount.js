import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom'
import { AuthContainer } from '../state-management';


function ManageAccountHelper(props){
  return (
    <div>
      <Dropdown item text='Account'>
      {
        props.auth.user ?
          <Dropdown.Menu>
            <Dropdown.Item onClick={props.logout}>
              Log out
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/account">Edit account</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        :
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/login">Log in</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
      }
      </Dropdown>
    </div>
  );
}

function ManageAccount(props){
  return (
    <AuthContainer component={ManageAccountHelper} {...props}/>
  );
}

export default ManageAccount;
