const defaultState = {
}

export default (state=defaultState, action={}) => {
  switch(action.type){
    case 'ADD_USER_PENDING':
      return state;
    case 'ADD_USER_FULFILLED':
      return state;
    case 'ADD_USER_REJECTED':
      return Object.assign({}, state, {
        register_error: action.payload.data
      });
    default:
      return state;
  }
}
