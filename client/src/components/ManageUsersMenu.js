import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';


class ManageUsersMenu extends React.Component {
  render() {
    return (
      <div>
        <Dropdown item text='Manage Users'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/registration">Requests</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/users">Edit users</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ManageUsersMenu;
