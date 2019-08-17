import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';


function ManageAidsMenu(props) {
  return (
    <Dropdown item text='Manage Aids'>
      <Dropdown.Menu>
        <Dropdown.Item text='All Aids' onClick={(event, data) => props.history.push("/aids")}>
        </Dropdown.Item>
        {/* <Dropdown.Item text='All Reservations' onClick={(event, data) => console.log("/reservations")}>
              <Link to="/reservations">All Reservations</Link>
            </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ManageAidsMenu;
