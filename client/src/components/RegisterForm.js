import React from 'react';
import {
  Card,
  Button,
  Input
} from 'semantic-ui-react';

class RegisterForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      'name': '',
      'email': '',
      'password': '',
      'password2': '',
      'mobileNumber': ''
    };
  }

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleClick = () => {
    //this.props.prompt("password fields do not match", "warning");
    // const fields = Object.keys(this.state);
    // for(var i = 0; i < fields.length; i++){
    //   if(!this.state[fields[i]] || this.state[fields[i]] === ""){
    //     this.props.promptm(fields[i]+" is missing", "warning");
    //     //return;
    //   }
    // }

    if(this.state.password !== this.state.password2){
      this.props.prompt("password fields do not match", "warning");
      return;
    }

    this.props.register(this.state.name, this.state.email, this.state.password, this.state.mobileNumber);
  }

  render(){
    return(
      <Card centered>
          <Card.Content>
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
              register
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

export default RegisterForm;
