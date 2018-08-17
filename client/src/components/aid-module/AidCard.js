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
      <Image src={"api/uploads/" + props.image} size='huge' />
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
    </Card>
  );
}

export default AidCard;

// <Card.Content extra>
//   <Button.Group attached fluid>
//     <Button color='green' disabled={props.reserved}>
//       <Icon name="in cart"/>
//       Reserve
//     </Button>
//     <Button basic color='blue'>
//       <Icon name="bookmark"/>
//       Tag
//     </Button>
//   </Button.Group>
// </Card.Content>
