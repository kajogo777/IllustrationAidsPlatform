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
      'email': '',
      'password': ''
    };
  }

  handleChangeEmail = (event) => {
    this.setState({
      'email': event.target.value
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      'password': event.target.value
    });
  };

  handleClick = () => {
    if(this.state.email && this.state.password)
      this.props.login(this.state.email, this.state.password);
  }

  render(){
    if(this.props.auth.user){
      return <Redirect to='/aidgrid' />
    }

    return(
      <Card centered>
          <Card.Content>
            <Card.Header textAlign='center'>
              Log In
            </Card.Header>
            <Card.Description>
              <Input
                fluid
                type="email"
                placeholder='email'
                value={this.state.email}
                onChange={this.handleChangeEmail}
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
