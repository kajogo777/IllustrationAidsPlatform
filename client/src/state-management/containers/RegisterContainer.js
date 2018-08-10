import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { addUser } from '../actions/users-actions';
import { prompt } from '../actions/prompt-actions';


function mapStateToProps (state){
  return {
    register_error: state.userStore.register_error
  };
}

function mapDispatchToProps (dispatch){
  return {
    register: (name, username, password, mobileNumber) => {
      dispatch(addUser(name, username, password, mobileNumber))
    },
    prompt: (message, type) => {
      dispatch(prompt(message, type, null, 5))
    }
  };
}

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default RegisterContainer;
