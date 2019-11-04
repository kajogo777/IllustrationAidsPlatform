import React from 'react';
import {
  Menu
} from 'semantic-ui-react';
import {
  withRouter
} from 'react-router-dom'
import AdminRoute from '../AdminRoute';
import ManageAccountMenu from './ManageAccountMenu';
import ManageMenu from './ManageMenu';


function NavigationBar(props) {
  return (
    <Menu attached='top' size="huge" compact stackable>
      <Menu.Item>
        <img src="family-logo.jpg" alt={"logo"} style={{ "width": 90 }} />
      </Menu.Item>
      <Menu.Item header onClick={(event, data) => props.history.push("/aidgrid")}>
        <h3>
          St. Mary Illustration Aids Library
          </h3>
      </Menu.Item>
      <Menu.Menu position='right'>
        <AdminRoute>
          <Menu.Item >
            <ManageMenu history={props.history} />
          </Menu.Item>
        </AdminRoute>
        <Menu.Item >
          <ManageAccountMenu history={props.history} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(NavigationBar);
