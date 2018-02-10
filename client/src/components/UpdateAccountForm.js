import React from 'react';
import {
  Card,
  Button,
  Input
} from 'semantic-ui-react';

class updateAccountForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'name': props.auth.user.name,
      'email': props.auth.user.email,
      'password': '',
      'password2': '',
      'mobileNumber': props.auth.user.mobileNumber
    };
  }

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleClick = () => {
    if(this.state.password !== this.state.password2){
      this.props.prompt("password fields do not match", "failure");
      return;
    }

    let user = Object.assign({}, {
      '_id': this.props.auth.user._id,
      'name': this.state.name,
      'email': this.state.email,
      'mobileNumber': this.state.mobileNumber
    });
    if(this.state.password !== ""){
      user['password'] = this.state.password
    }
    this.props.updateAccount(user);
  }

  render(){
    return(
      <Card centered>
          <Card.Content>
            <Card.Header>
              Update Account
            </Card.Header>
            <Card.Description>
              <Input
                fluid
                type="name"
                placeholder='name'
                value={this.state.name}
                onChange={(e) => { this.handleChange('name', e) }}
              />
              <Input
                fluid
                type="email"
                placeholder='email'
                value={this.state.email}
                onChange={(e) => { this.handleChange('email', e) }}
              />
              <Input
                fluid
                type="password"
                placeholder='password'
                value={this.state.password}
                onChange={(e) => { this.handleChange('password', e) }}
              />
              <Input
                fluid
                type="password"
                placeholder='repeat password'
                value={this.state.password2}
                onChange={(e) => { this.handleChange('password2', e) }}
              />
              <Input
                fluid
                type="mobileNumber"
                placeholder='mobileNumber'
                value={this.state.mobileNumber}
                onChange={(e) => { this.handleChange('mobileNumber', e) }}
              />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              fluid
              primary
              onClick={this.handleClick}
              >
              save
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

export default updateAccountForm;
