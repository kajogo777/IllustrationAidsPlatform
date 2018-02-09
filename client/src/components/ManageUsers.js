import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';


class ManageUsers extends React.Component {
  render() {
    return (
      <div>
        <Dropdown item text='Manage Users'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/registration">Accept users</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ManageUsers;
