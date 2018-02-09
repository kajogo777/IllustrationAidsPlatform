const defaultState = {
  pending_users: [],
  fetch_user_error: null,
  approve_user_error: null
}

export default (state=defaultState, action={}) => {
  let pending_users = [];

  switch(action.type){
    case 'ADD_USER_PENDING':
      return state;
    case 'ADD_USER_FULFILLED':
      return state;
    case 'ADD_USER_REJECTED':
      return Object.assign({}, state, {
        register_error: action.payload.data
      });
    case 'FETCH_PENDING_USERS_PENDING':
      return state;
    case 'FETCH_PENDING_USERS_FULFILLED':
      return Object.assign({}, state, {
        pending_users: action.payload.data
      });
    case 'FETCH_PENDING_USERS_REJECTED':
      return Object.assign({}, state, {
        fetch_user_error: action.payload.data
      });
    case 'APPROVE_USER_PENDING':
      return state;
    case 'APPROVE_USER_FULFILLED':
      for(let i = 0; i < state.pending_users.length; i++){
        let user = Object.assign({}, state.pending_users[i]);
        if(user._id !== action.payload._id)
          pending_users.push(user);
      }
      return Object.assign({}, state, {
        pending_users: pending_users
      });
    case 'APPROVE_USER_REJECTED':
      return Object.assign({}, state, {
        approve_user_error: action.payload.data
      });
    case 'DELETE_USER_FULFILLED':
      for(let i = 0; i < state.pending_users.length; i++){
        let user = Object.assign({}, state.pending_users[i]);
        if(user._id !== action.payload._id)
          pending_users.push(user);
      }
      return Object.assign({}, state, {
        pending_users: pending_users
      });
    default:
      return state;
  }
}
