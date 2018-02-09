import React from 'react';
import { PromptContainer } from '../state-management';
import {
  Message,
  Container
} from 'semantic-ui-react';

function PromptBannerHelper(props){
  if(props.prompt){
    switch(props.prompt.type){
      case 'info':
        return (
          <Message info>
            <Message.Header>{props.prompt.title || "Info"}</Message.Header>
            <p>{props.prompt.message}</p>
          </Message>
        );
      case 'success':
        return (
          <Message positive>
            <Message.Header>{props.prompt.title || "Success"}</Message.Header>
            <p>{props.prompt.message}</p>
          </Message>
        );
      case 'failure':
        return (
          <Message negative>
            <Message.Header>{props.prompt.title || "Failure"}</Message.Header>
            <p>{props.prompt.message}</p>
          </Message>
        );
      default:
        return null;
    }
  }
  return null;
}

function PromptBanner(props){
  return (
    <Container>
      <PromptContainer component={PromptBannerHelper} {...props}/>
    </Container>
  );
}

export default PromptBanner;
