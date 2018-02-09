import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { prompt } from '../actions/prompt-actions';

function mapStateToProps (state){
  return Object.assign({},{
    prompt: state.promptStore.prompt
  });
}

function mapDispatchToProps (dispatch){
  return {
  };
}

const PromptContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default PromptContainer;
