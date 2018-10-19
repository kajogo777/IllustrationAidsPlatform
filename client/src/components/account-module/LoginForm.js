import React from 'react';
import {
  Card,
  Button,
  Input
} from 'semantic-ui-react';
import {
  Redirect
} from 'react-router-dom';

class LoginForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'username': '',
      'password': ''
    };
  }

  handleChangeUsername = (event) => {
    this.setState({
      'username': event.target.value
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      'password': event.target.value
    });
  };

  handleClick = () => {
    if(this.state.username && this.state.password)
      this.props.login(this.state.username, this.state.password);
  }

  render(){
    let jwt = localStorage.getItem('feathers-jwt');

    if (jwt) {
      this.props.login(null, null, jwt);
    }

    if(this.props.auth.user){
      return <Redirect to='/aidgrid' />
    }

    return(
      <Card centered>
          <Card.Content>
            <Card.Description>
              <Input
                fluid
                type="username"
                placeholder='username'
                value={this.state.username}
                onChange={this.handleChangeUsername}
              />
              <Input
                fluid
                type="password"
                placeholder='password'
                value={this.state.password}
                onChange={this.handleChangePassword}
                />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              fluid
              primary
              onClick={this.handleClick}
              >
              login
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

export default LoginForm;
