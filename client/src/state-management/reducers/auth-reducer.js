const defaultState = {
  auth: {}
}

export default (state=defaultState, action={}) => {
  switch(action.type){

    case 'LOGOUT_FULFILLED':
      return Object.assign({}, state, {
        auth: {}
      });

    case 'LOGOUT_REJECTED':
      return Object.assign({}, state, {
        auth_error: action.payload.data
      });


    case 'LOGIN_FULFILLED':
      return Object.assign({}, state, {
        auth: {
          user: action.payload
        }
      });

    case 'LOGIN_REJECTED':
      return Object.assign({}, state, {
        auth_error: action.payload
      });

    default:
      return state;
  }
}
