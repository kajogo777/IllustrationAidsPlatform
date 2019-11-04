import React from 'react';
import {
  Dropdown
} from 'semantic-ui-react';


function ManageMenu(props) {
  return (
    <Dropdown item text='Manage'>
      <Dropdown.Menu>
        <Dropdown.Item text='Registration' onClick={(event, data) => props.history.push("/registration")}>
        </Dropdown.Item>
        <Dropdown.Item text='Users' onClick={(event, data) => props.history.push("/users")}>
        </Dropdown.Item>
        <Dropdown.Item text='Aids' onClick={(event, data) => props.history.push("/aids")}>
        </Dropdown.Item>
        {/* <Dropdown.Item text='All Reservations' onClick={(event, data) => console.log("/reservations")}>
              <Link to="/reservations">All Reservations</Link>
            </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ManageMenu;
