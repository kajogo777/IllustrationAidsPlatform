const defaultState = {
  aids: []
}

export default (state=defaultState, action={}) => {
  switch(action.type){
    case 'FETCH_AIDS_PENDING':
      return state;
    case 'FETCH_AIDS_FULFILLED':
      return Object.assign({}, state, {
        aids: action.payload.data
      });
    case 'FETCH_AIDS_REJECTED':
      return Object.assign({}, state, {
        error: action.payload.data
      });
    default:
      return state;
  }
}
