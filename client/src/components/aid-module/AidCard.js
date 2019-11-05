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
        <Card.Description textAlign="center">
          <p className="word-wrap">
            {props.item.description}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra textAlign="right">
        {
          props.item.type === 'DIGITAL' ?
            <Label color='violet' tag >DIGITAL</Label>
            :
            <Label color='blue' tag >REGULAR</Label>
        }
      </Card.Content>
    </Card>
  );
}

export default AidCard;
