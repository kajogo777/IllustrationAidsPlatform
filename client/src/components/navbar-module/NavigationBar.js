import React from 'react';
import {
  Menu,
  Image,
  Header
} from 'semantic-ui-react';
import {
  withRouter
} from 'react-router-dom'
import AdminRoute from '../AdminRoute';
import ManageAccountMenu from './ManageAccountMenu';
import ManageMenu from './ManageMenu';


function NavigationBar(props) {
  return (
    <Menu attached='top' compact stackable borderless>
      <Menu.Item fitted='vertically' header onClick={(event, data) => props.history.push('/aidgrid')}>
        <Image spaced='right' src='family-logo.jpg' alt={'logo'} size='tiny' />
        <Header textAlign='justified'>
          St. Mary Illustration Aids Library
        </Header>
      </Menu.Item>
      <Menu.Menu position='right'>
        <AdminRoute>
          <Menu.Item fitted='vertically'  >
            <ManageMenu history={props.history} />
          </Menu.Item>
        </AdminRoute>
        <Menu.Item fitted='vertically' >
          <ManageAccountMenu history={props.history} />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(NavigationBar);
