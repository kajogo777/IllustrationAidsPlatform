import React from 'react';
import {
  Menu
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom'
import AdminRoute from '../AdminRoute';
import ManageAccountMenu from './ManageAccountMenu';
import ManageAidsMenu from './ManageAidsMenu';
import ManageUsersMenu from './ManageUsersMenu';


function NavigationBar(props){
  return(
    <div>
      <Menu attached='top' size="huge" compact stackable>
        <Menu.Item>
          <img src="family-logo.jpg" alt={"logo"} style={{"width": 90}}/>
        </Menu.Item>
        <Menu.Item header>
          <Link to="/aidgrid">
            St. Mary Illustration Aids Library
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <AdminRoute>
            <Menu.Item >
              <ManageAidsMenu/>
            </Menu.Item>
          </AdminRoute>
          <AdminRoute>
            <Menu.Item >
              <ManageUsersMenu/>
            </Menu.Item>
          </AdminRoute>
          <Menu.Item >
            <ManageAccountMenu/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default NavigationBar;
