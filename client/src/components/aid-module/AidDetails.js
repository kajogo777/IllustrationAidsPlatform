import React from 'react';
import {
  Image,
  Header,
  Segment,
  Label,
  Button,
  Icon
} from 'semantic-ui-react';


function AidDetails(props){
  const colors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","grey","brown","black"];
  return(
    <div>
      <Header as='h3' block attached='top'>
        { props.item.name } ({props.item.date_added})
      </Header>
      <Segment attached>
        <Image fluid src={"api/uploads/" + props.item.image_uri}/>
      </Segment>
      <Segment attached>
        {props.item.description}
      </Segment>
      <Segment attached>
        {
          props.item.tags.map((item) =>
            <Label
              as='a'
              key={item}
              color={colors[Math.floor(Math.random()*colors.length)]}
            >
               <strong> {item} </strong>
            </Label>
          )
        }
      </Segment>

      <Button.Group attached fluid>
        <Button color='green' disabled={props.item.reserved}>
          <Icon name="in cart"/>
          Reserve
        </Button>
      </Button.Group>

    </div>
  );
}

export default AidDetails;
