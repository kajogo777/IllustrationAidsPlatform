import React from 'react';
import {
  Image,
  Header,
  Segment,
  Label,
  Button,
  Icon,
  Grid
} from 'semantic-ui-react';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';

const colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","grey","brown","black"];

class AidDetails extends React.Component{
  constructor(props){
    super(props);

    let state = {
      date: null,
      focused: false
    };

    this.state = state;
  }

  getRandomColor(){
    return colors[Math.floor(Math.random()*colors.length)];
  }

  isBlocked(date){
    if(date.weekday() == 5){
      return false;
    }else{
      return true;
    }
  }

  render(){
    return(
      <div>
        <Header as='h3' block attached='top' textAlign='center'>
          { this.props.item.name }
          <br/>
          ({this.props.item.date_added})
        </Header>
        <Segment attached>
          <Image fluid src={"api/uploads/" + this.props.item.image_uri}/>
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
            block
            noBorder
            isDayBlocked={this.isBlocked}
          />
          <Button color='green' disabled={this.state.date == null} attached='bottom'>
            <Icon name="in cart"/>
            Reserve
          </Button>
        </div>
      </div>
    );
  }
}

export default AidDetails;
