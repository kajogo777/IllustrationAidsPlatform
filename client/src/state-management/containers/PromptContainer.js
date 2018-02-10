import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';

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
