import React from 'react';
import {
  Menu,
  Container,
  Segment,
  Sticky
} from 'semantic-ui-react';
import {
  Link
} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import SearchField from './SearchField';
import ManageAccount from './ManageAccount';
import ManageAids from './ManageAids';
import ManageUsers from './ManageUsers';


function NavigationBar(props){
  return(
    <div>
      <Menu attached='top' size="huge" compact stackable>
        <Menu.Item>
          <img src="church-logo.jpg" alt={"logo"}/>
        </Menu.Item>
        <Menu.Item header>
          <Link to="/aidgrid">
            St. Mary Illustration Aids Library
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <AdminRoute>
            <Menu.Item >
              <ManageAids/>
            </Menu.Item>
          </AdminRoute>
          <AdminRoute>
            <Menu.Item >
              <ManageUsers/>
            </Menu.Item>
          </AdminRoute>
          <Menu.Item >
            <ManageAccount/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <PrivateRoute path="/aidgrid">
        <Container text>
          <Sticky context={props.contextRef} offset={0} className="top-sticky">
            <Segment>
              <SearchField/>
            </Segment>
          </Sticky>
        </Container>
      </PrivateRoute>
    </div>
  );
}

export default NavigationBar;
