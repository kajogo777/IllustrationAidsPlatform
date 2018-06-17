import React from 'react';
import {
  Input,
  Table,
  Button,
  Icon,
  Modal,
  Dropdown
} from 'semantic-ui-react';


class UserRow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      user: {
        name: props.user.name,
        email: props.user.email,
        mobileNumber: props.user.mobileNumber,
        role: props.user.role
      }
    };
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value
      }
    });
  }

  handleSave = () => {
    let user = Object.assign({}, this.state.user);
    this.props.updateUser(this.props.user._id, user);
    this.handleClose();
  }

  handleDelete = () => {
    this.props.deleteUser(this.props.user);
    this.handleClose();
  }

  render(){

    const inlineStyle = {
      modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    return(
      <Table.Row>
        <Table.Cell>{this.props.user.name}</Table.Cell>
        <Table.Cell>{this.props.user.email}</Table.Cell>
        <Table.Cell>{this.props.user.mobileNumber}</Table.Cell>
        <Table.Cell>{this.props.user.role}</Table.Cell>
        <Table.Cell collapsing>

          <Modal trigger={
            <Button color="olive" icon basic onClick={this.handleOpen}>
              <Icon name='edit' size='large'/>
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          closeOnDimmerClick={false}
          style={inlineStyle.modal}
          >
            <Modal.Header>Edit User</Modal.Header>
            <Modal.Content>
              <Input
                fluid
                type="name"
                placeholder='name'
                value={this.state.user.name}
                onChange={(e) => { this.handleChange('name', e.target.value) }}
              />
              <Input
                fluid
                type="email"
                placeholder='email'
                value={this.state.user.email}
                onChange={(e) => { this.handleChange('email', e.target.value) }}
              />
              <Input
                fluid
                type="mobileNumber"
                placeholder='mobile number'
                value={this.state.user.mobileNumber}
                onChange={(e) => { this.handleChange('mobileNumber', e.target.value) }}
              />
              <Dropdown
                placeholder='role'
                options={[{text: 'ADMIN', value: 'ADMIN'}, {text: 'SERVANT', value: 'SERVANT'}]}
                value={this.state.user.role}
                onChange={(e, {value}) => { this.handleChange('role', value) }}
                fluid
                closeOnChange
                selection
              />
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.handleDelete}>
                delete
              </Button>
              <Button color='green' onClick={this.handleSave}>
                save
              </Button>
              <Button color='yellow' onClick={this.handleClose}>
                cancel
              </Button>
            </Modal.Actions>
          </Modal>

        </Table.Cell>
      </Table.Row>
    );
  }
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

  componentWillUnmount(){
    this.props.clearFilter();
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
           <Table.HeaderCell />
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
            <Table.Cell/>
          </Table.Row>
          {
            this.props.confirmed_users.map((item) =>
              <UserRow key={item._id} updateUser={this.props.updateUser} deleteUser={this.props.deleteUser} user={item} />
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

export default UsersPanel;
