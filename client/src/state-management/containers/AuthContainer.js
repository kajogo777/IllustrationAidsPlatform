import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { logout, login, updateAccount } from '../actions/auth-actions';
import { prompt } from '../actions/prompt-actions';


function mapStateToProps (state, ownProps){
  return Object.assign({},{
    auth: state.authStore.auth
  }, ownProps);
}

function mapDispatchToProps (dispatch){
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    },
    logout: () => {
      dispatch(logout())
    },
    updateAccount: (user) => {
      dispatch(updateAccount(user))
    },
    prompt: (message, type) => {
      dispatch(prompt(message, type, null, 5))
    }
  };
}

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AuthContainer;
