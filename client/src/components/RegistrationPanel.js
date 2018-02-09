import React from 'react';
import {
  Card,
  Button
} from 'semantic-ui-react';
import TimeAgo from 'react-timeago'

function RegEntry(props){
  return (
    <Card color='orange' centered raised>
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          <TimeAgo date={props.createdAt}/>
        </Card.Meta>
        <Card.Description>
          Email: {props.email}
          <br/>
          Mobile Number: {props.mobileNumber}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button.Group floated='right'>
          <Button basic color='green' onClick={props.onAccept}>
            Approve
          </Button>
          <Button basic color='red' onClick={props.onReject}>
            Reject
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

class RegistrationPanel extends React.Component{

  componentDidMount(){
    this.props.onLoad();
  }

  render(){
    return(
      <Card.Group stackable doubling>
        {
          this.props.pending_users.map((item) =>
            <RegEntry
              key={item._id}
              name={item.name}
              createdAt={item.createdAt}
              email={item.email}
              mobileNumber={item.mobileNumber}
              onAccept={ () => this.props.approveUser(item) }
              onReject={ () => this.props.deleteUser(item) }
            />
          )
        }
      </Card.Group>
    );
  }
}

export default RegistrationPanel;
