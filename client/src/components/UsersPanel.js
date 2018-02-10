import React from 'react';
import {
  Input,
  Table,
} from 'semantic-ui-react';

function UserRow(props){
  return(
    <Table.Row>
      <Table.Cell>{props.data.name}</Table.Cell>
      <Table.Cell>{props.data.email}</Table.Cell>
      <Table.Cell>{props.data.mobileNumber}</Table.Cell>
      <Table.Cell>{props.data.role}</Table.Cell>
    </Table.Row>
  );
}

class UsersPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      nameFilter: '',
      emailFilter: '',
      mobileNumberFilter: '',
      roleFilter: ''
    };
  }

  handleChange(field, event){
    this.setState({
      [field + "Filter"]: event.target.value
    });
    this.props.filterUsers(field, event.target.value);
  }

  componentDidMount(){
    this.props.onLoad();
  }

  render(){
    return(
      <Table celled stackable selectable textAlign='center'>
        <Table.Header>
         <Table.Row>
           <Table.HeaderCell>Name</Table.HeaderCell>
           <Table.HeaderCell>Email</Table.HeaderCell>
           <Table.HeaderCell>Mobile Number</Table.HeaderCell>
           <Table.HeaderCell>Role</Table.HeaderCell>
         </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                fluid
                type="name"
                placeholder='name filter'
                value={this.state.nameFilter}
                onChange={(e) => { this.handleChange("name", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="email"
                placeholder='email filter'
                value={this.state.emailFilter}
                onChange={(e) => { this.handleChange("email", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="mobileNumber"
                placeholder='mobile number filter'
                value={this.state.mobileNumberFilter}
                onChange={(e) => { this.handleChange("mobileNumber", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="role"
                placeholder='role filter'
                value={this.state.roleFilter}
                onChange={(e) => { this.handleChange("role", e) }}
              />
            </Table.Cell>
          </Table.Row>
          {
            this.props.confirmed_users.map((item) =>
              <UserRow key={item._id} data={item} />
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

export default UsersPanel;
