const defaultState = {
  pending_users: [],
  confirmed_users: [],
  fetch_user_error: null,
  approve_user_error: null,

  filters: {
  }
}

export default (state=defaultState, action={}) => {
  let pending_users = [];
  let confirmed_users = [];

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
        fetch_users_error: action.payload.data
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
      for(let i = 0; i < state.confirmed_users.length; i++){
        let user = Object.assign({}, state.confirmed_users[i]);
        if(user._id !== action.payload._id)
          confirmed_users.push(user);
      }
      return Object.assign({}, state, {
        pending_users: pending_users,
        confirmed_users: confirmed_users
      });

    case 'UPDATE_USER_FULFILLED':
      for(let i = 0; i < state.confirmed_users.length; i++){
        let user = Object.assign({}, state.confirmed_users[i]);
        if(user._id === action.payload._id)
          user = Object.assign({}, state.confirmed_users[i], action.payload);
        confirmed_users.push(user);
      }
      return Object.assign({}, state, {
        confirmed_users: confirmed_users
      });

    case 'FETCH_CONFIRMED_USERS_PENDING':
      return state;
    case 'FETCH_CONFIRMED_USERS_FULFILLED':
      return Object.assign({}, state, {
        confirmed_users: action.payload.data
      });
    case 'FETCH_CONFIRMED_USERS_REJECTED':
      return Object.assign({}, state, {
        fetch_users_error: action.payload.data
      });

    case 'FILTER_USERS':
      return Object.assign({}, state, {
        filters: {
          ...state.filters,
          [action.payload.field]: action.payload.value
        }
      });
    default:
      return state;
  }
}
