import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchPendingUsers, approvePendingUser, deleteUser } from '../actions/users-actions';

function mapStateToProps (state){
  return {
    pending_users: state.userStore.pending_users
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchPendingUsers())
    },
    approveUser: (user) => {
      dispatch(approvePendingUser(user))
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user))
    }
  };
}

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default UserContainer;
