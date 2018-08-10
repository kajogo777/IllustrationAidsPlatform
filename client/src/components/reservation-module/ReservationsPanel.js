import React from 'react';
import {
  Input,
  Table,
  Button,
  Icon,
  Modal,
  Form
} from 'semantic-ui-react';


class ReservationRow extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false,
      reservation: {
        human_id: props.reservation.human_id,
        user_id: props.reservation.user_id,
        pickup_date: props.reservation.pickup_date,
        returned: props.reservation.returned,
        date_reserved: props.reservation.date_reserved,
        duration_in_weeks: props.reservation.duration_in_weeks
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
        <Table.Cell>{this.props.reservation.user_id}</Table.Cell>
        <Table.Cell>{this.props.reservation.pickup_date}</Table.Cell>
        <Table.Cell>{""+this.props.reservation.returned}</Table.Cell>
        <Table.Cell>{this.props.reservation.date_reserved}</Table.Cell>
        <Table.Cell>{this.props.reservation.duration_in_weeks}</Table.Cell>

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
              <Form.Checkbox
                label='Returned'
                checked={this.state.reservation.returned}
                onChange={(e) => { this.handleChange('returned', !this.state.reservation.returned) }}
              />
            </Form>
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

class ReservationsPanel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      human_idFilter: '',
      user_idFilter: '',
      pickup_dateFilter: '',
      returnedFilter: '',
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
           <Table.HeaderCell>User ID</Table.HeaderCell>
           <Table.HeaderCell>Pickup Date</Table.HeaderCell>
           <Table.HeaderCell>Returned</Table.HeaderCell>
           <Table.HeaderCell>Date Reserved</Table.HeaderCell>
           <Table.HeaderCell>Duration (weeks)</Table.HeaderCell>
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
                type="user_id"
                placeholder='user id filter'
                value={this.state.user_idFilter}
                onChange={(e) => { this.handleChange("user_id", e) }}
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
                type="returned"
                placeholder='returned filter'
                value={this.state.returnedFilter}
                onChange={(e) => { this.handleChange("returned", e) }}
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
