import React from 'react';
import {
  Image,
  Header,
  Segment,
  Label,
  Button,
  Icon,
  Dropdown
} from 'semantic-ui-react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const colors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "grey", "brown", "black"];

class AidDetails extends React.Component {
  constructor(props) {
    super(props);

    let state = {
      date: null,
      focused: false,
      duration_in_weeks: 1
    };

    this.state = state;
  }

  componentDidMount() {
    this.props.getAidReservations(this.props.item._id);
  }

  getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  isBlocked = (date) => {
    if (date.weekday() !== 5)
      return true;

    for (let i in this.props.reservations) {
      let res = this.props.reservations[i];
      let startDate = new Date(res.pickup_date);
      let endDate = new Date(res.pickup_date);
      endDate.setDate(endDate.getDate() + res.duration_in_weeks * 7);

      let d = date.toDate();

      if (startDate <= d && d < endDate)
        return true;
    }

    return false;
  }

  handleReserve = () => {
    this.props.addReservation({
      human_id: this.props.item.human_id,
      aid_id: this.props.item._id,
      pickup_date: this.state.date,
      duration_in_weeks: this.state.duration_in_weeks
    });
  }

  render() {
    return (
      <div>
        <Header as='h3' block attached='top' textAlign='center'>
          {this.props.item.name}
          <br />
          ID: {this.props.item.human_id}
        </Header>
        <Segment attached onClick={() => {
          if (this.props.item.url !== '')
            window.open(this.props.item.url, "_blank")
        }} style={this.props.item.url !== '' ? { cursor: 'pointer' } : {}}>
          {
            this.props.item.type === 'DIGITAL' ?
              <Label color='violet' ribbon>
                <strong> click me! </strong>
              </Label>
              :
              null
          }
          <Image fluid src={"uploads/" + this.props.item.image_uri} />
        </Segment>
        <Segment attached>
          {this.props.item.description}
        </Segment>
        <Segment attached>
          {
            this.props.item.tags.map((item) =>
              <Label
                as='a'
                key={item}
                color={this.getRandomColor()}
              >
                <strong> {item} </strong>
              </Label>
            )
          }
        </Segment>
        {/* {
          this.props.item.type === 'REGULAR' ?
            <div>
              <SingleDatePicker
                placeholder='Pickup Date (click)'
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                id="your_unique_id"
                numberOfMonths={1}
                openDirection="up"
                noBorder
                block
                isDayBlocked={this.isBlocked}
              />
              <Dropdown
                disabled={this.state.date === null}
                options={[
                  { text: '1 Week', value: 1 },
                  { text: '2 Weeks', value: 2 },
                ]}
                value={this.state.duration_in_weeks}
                onChange={(e, { value }) => this.setState({ duration_in_weeks: value })}
                fluid
                closeOnChange
                selection
              />
              <Button color='green' disabled={this.state.date === null} attached='bottom' onClick={this.handleReserve}>
                <Icon name="in cart" />
                Reserve
            </Button>
            </div>
            :
            null
        } */}
      </div>
    );
  }
}

export default AidDetails;
