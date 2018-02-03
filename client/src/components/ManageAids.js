import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom';


class ManageAids extends React.Component {
  render() {
    return (
      <div>
        <Dropdown item text='Administer Aids'>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/aids">Edit aids</Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to="/reservations">View reservations</Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default ManageAids;
