import React from 'react';
import {
  Card,
  Image,
} from 'semantic-ui-react';

//after deployment remove absolute urls
//TODO
function AidCard(props){
  return(
    <Card centered raised onClick={(event, data) => props.handleFocus(props.item)}>
      <Image src={"api/uploads/" + props.item.image_uri} size='huge' />
      <Card.Content>
        <Card.Header>
          {props.item.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            {props.item.date_added}
          </span>
        </Card.Meta>
        <Card.Description>
          {props.item.description}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default AidCard;
