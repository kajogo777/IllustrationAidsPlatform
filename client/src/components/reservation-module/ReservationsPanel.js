import React from 'react';
import {
  Input,
  Table,
  Button,
  Icon,
  Modal,
  Form,
  Pagination
} from 'semantic-ui-react';


class ReservationRow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      reservation: {
        human_id: props.reservation.human_id,
        username: props.reservation.username,
        pickup_date: props.reservation.pickup_date,
        date_reserved: props.reservation.date_reserved,
        duration_in_weeks: props.reservation.duration_in_weeks,
        status: props.reservation.status
      }
    };
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (field, value) => {
    this.setState({
      reservation: {
        ...this.state.reservation,
        [field]: value
      }
    });
  }

  handleSave = () => {
    let reservation = Object.assign({}, this.state.reservation);
    this.props.updateReservation(this.props.reservation._id, reservation);
    this.handleClose();
  }

  handleDelete = () => {
    this.props.deleteReservation(this.props.reservation);
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
        <Table.Cell>{this.props.reservation.human_id}</Table.Cell>
        <Table.Cell>{this.props.reservation.username}</Table.Cell>
        <Table.Cell>{this.props.reservation.pickup_date}</Table.Cell>
        <Table.Cell>{this.props.reservation.date_reserved}</Table.Cell>
        <Table.Cell>{this.props.reservation.duration_in_weeks}</Table.Cell>
        <Table.Cell>{this.props.reservation.status}</Table.Cell>

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
            <Modal.Header>Edit Reservation</Modal.Header>
            <Modal.Content>
            <Form>
              <Form.Input
                fluid
                label='Pick Up Date'
                type="date"
                placeholder='pickup date'
                value={this.state.reservation.pickup_date}
                onChange={(e) => { this.handleChange('pickup_date', e.target.value) }}
              />
              <Form.Dropdown
                label='Reservation Duration'
                placeholder='duration_in_weeks'
                options={[{text: 'One Week', value: 1}, {text: 'Two Weeks', value: 2}]}
                value={this.state.reservation.duration_in_weeks}
                onChange={(e, {value}) => { this.handleChange('duration_in_weeks', value) }}
                fluid
                closeOnChange
                selection
              />
              <Form.Dropdown
                label='Reservation Status'
                placeholder='status'
                options={[
                  {text: 'PENDING', value: 'PENDING'},
                  {text: 'CHECKED OUT', value: 'CHECKED OUT'},
                  {text: 'RETURNED', value: 'RETURNED'},
                  {text: 'OVERDUE', value: 'OVERDUE'},
                ]}
                value={this.state.reservation.status}
                onChange={(e, {value}) => { this.handleChange('status', value) }}
                fluid
                closeOnChange
                selection
              />
            </Form>
            </Modal.Content>
            <Modal.Actions>
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

class ReservationsPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      human_idFilter: '',
      usernameFilter: '',
      pickup_dateFilter: '',
      date_reservedFilter: '',
      duration_in_weeksFilter: ''
    };
  }

  handleChange(field, event){
    this.setState({
      [field + "Filter"]: event.target.value
    });
    this.props.filterReservations(field, event.target.value);
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
           <Table.HeaderCell>Aid ID</Table.HeaderCell>
           <Table.HeaderCell>Username</Table.HeaderCell>
           <Table.HeaderCell>Pickup Date</Table.HeaderCell>
           <Table.HeaderCell>Date Reserved</Table.HeaderCell>
           <Table.HeaderCell>Duration (weeks)</Table.HeaderCell>
           <Table.HeaderCell>Status</Table.HeaderCell>
           <Table.HeaderCell />
         </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                fluid
                type="human_id"
                placeholder='aid id filter'
                value={this.state.human_idFilter}
                onChange={(e) => { this.handleChange("human_id", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="username"
                placeholder='user id filter'
                value={this.state.usernameFilter}
                onChange={(e) => { this.handleChange("username", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="pickup_date"
                placeholder='pick up date filter'
                value={this.state.pickup_dateFilter}
                onChange={(e) => { this.handleChange("pickup_date", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="date_reserved"
                placeholder='date reserved filter'
                value={this.state.date_reservedFilter}
                onChange={(e) => { this.handleChange("date_reserved", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="duration_in_weeks"
                placeholder='duration filter'
                value={this.state.duration_in_weeksFilter}
                onChange={(e) => { this.handleChange("duration_in_weeks", e) }}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                fluid
                type="status"
                placeholder='status filter'
                value={this.state.status}
                onChange={(e) => { this.handleChange("status", e) }}
              />
            </Table.Cell>
            <Table.Cell/>
          </Table.Row>
          {
            this.props.reservations.map((item) =>
              <ReservationRow key={item._id} updateReservation={this.props.updateReservation} deleteReservation={this.props.deleteReservation} reservation={item} />
            )
          }
        </Table.Body>
      </Table>
    );
  }
}

export default ReservationsPanel;

// pagination example
// <Table.Footer>
//   <Table.Row>
//     <Table.HeaderCell colSpan='7'>
//       <Pagination defaultActivePage={1} totalPages={10} />
//     </Table.HeaderCell>
//   </Table.Row>
// </Table.Footer>
