import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { logout, login } from '../actions/auth-actions';


function mapStateToProps (state, ownProps){
  return Object.assign({},{
    auth: state.authStore.auth
  }, ownProps);
}

function mapDispatchToProps (dispatch){
  return {
    login: (email, password) => {
      dispatch(login(email, password))
    },
    logout: () => {
      dispatch(logout())
    }
  };
}

const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default AuthContainer;
