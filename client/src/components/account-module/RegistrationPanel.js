import React from 'react';
import {
  Card,
  Button,
  Container
} from 'semantic-ui-react';
import TimeAgo from 'react-timeago'

function RegEntry(props) {
  return (
    <Card color='orange' centered raised>
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          <TimeAgo date={props.createdAt} />
        </Card.Meta>
        <Card.Description>
          Username: {props.username}
          <br />
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

class RegistrationPanel extends React.Component {

  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <Container text>
        <br />
        <Card.Group itemsPerRow={1}>
          {
            this.props.pending_users.map((item) =>
              <RegEntry
                key={item._id}
                name={item.name}
                createdAt={item.createdAt}
                username={item.username}
                mobileNumber={item.mobileNumber}
                onAccept={() => this.props.approveUser(item)}
                onReject={() => this.props.deleteUser(item)}
              />
            )
          }
        </Card.Group>
      </Container>
    );
  }
}

export default RegistrationPanel;
