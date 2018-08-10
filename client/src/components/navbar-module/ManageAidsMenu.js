import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';


class ManageAidsMenu extends React.Component {
  render() {
    return (
      <div>
        <Dropdown item text='Manage Aids'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/aids">All Aids</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/reservations">All Reservations</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ManageAidsMenu;
