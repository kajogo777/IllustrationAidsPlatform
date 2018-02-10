import { connect }from 'react-redux';
import UniversalContainer from './UniversalContainer';
import { fetchConfirmedUsers, deleteUser, filterUsers, updateUser } from '../actions/users-actions';

function filterRows(list, filters){
  const filterKeys = Object.keys(filters);
  return list.filter((row) => {
    return filterKeys.reduce((acc, key) => acc && row[key].toLowerCase().indexOf(filters[key]) !== -1, true);
  });
}

function mapStateToProps (state){
  return {
    confirmed_users: filterRows(state.userStore.confirmed_users, state.userStore.filters)
  };
}

function mapDispatchToProps (dispatch){
  return {
    onLoad: () => {
      dispatch(fetchConfirmedUsers())
    },
    deleteUser: (user) => {
      dispatch(deleteUser(user))
    },
    updateUser: (id, user) => {
      dispatch(updateUser(id, user))
    },
    filterUsers: (field, value) => {
      dispatch(filterUsers(field, value))
    }
  };
}

const ConfirmedUserContainer = connect(mapStateToProps, mapDispatchToProps)(UniversalContainer);

export default ConfirmedUserContainer;
