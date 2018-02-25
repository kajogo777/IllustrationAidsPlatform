import React from 'react';
import {
  Card,
  Image,
  Icon,
  Button
} from 'semantic-ui-react';

//after deployment remove absolute urls
//TODO
function AidCard(props){
  return(
    <Card centered raised>
      <Image src={"http://localhost:3030/uploads/" + props.image} />
      <Card.Content>
        <Card.Header>
          {props.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {props.date}
          </span>
        </Card.Meta>
        <Card.Description>
          {props.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button color='green' disabled={props.reserved}>
            <Icon name="in cart"/>
            Reserve
          </Button>
          <Button color='blue' disabled={props.wished}>
            <Icon name="bookmark"/>
            Add to wish list
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default AidCard;
