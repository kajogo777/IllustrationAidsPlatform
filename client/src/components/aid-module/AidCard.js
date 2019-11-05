import React from 'react';
import {
  Card,
  Image,
  Label,
} from 'semantic-ui-react';

//after deployment remove absolute urls
//TODO
function AidCard(props) {
  return (
    <Card raised onClick={(event, data) => props.handleFocus(props.item)}>
      <Image src={"uploads/" + props.item.image_uri} size='huge' />
      <Card.Content>
        <Card.Header textAlign='center'>
          {props.item.name}
        </Card.Header>
        <Card.Meta>
          <span className='date'>
            ID:
            {/* {props.item.date_added} */}
            {props.item.human_id}
          </span>
        </Card.Meta>
        <Card.Description>
          {props.item.description}
        </Card.Description>
      </Card.Content>
      {
        props.item.type === 'DIGITAL' ?
          <Label color='violet' tag attached='bottom right'>DIGITAL</Label>
          :
          <Label color='blue' tag attached='bottom right'>REGULAR</Label>
      }
    </Card>
  );
}

export default AidCard;
