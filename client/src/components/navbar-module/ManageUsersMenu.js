import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';


function ManageUsersMenu(props) {
  return (
    <Dropdown item text='Manage Users'>
      <Dropdown.Menu>
        <Dropdown.Item text='Requests' onClick={(event, data) => props.history.push("/registration")}>
        </Dropdown.Item>
        <Dropdown.Item text='All Users' onClick={(event, data) => props.history.push("/users")}>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ManageUsersMenu;
