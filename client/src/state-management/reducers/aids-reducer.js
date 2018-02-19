const defaultState = {
  aids: [],
  filters: {
  }
}

export default (state=defaultState, action={}) => {
  let aids = []

  switch(action.type){
    //fetch
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

    //add
    case 'ADD_AID_FULFILLED':
      return Object.assign({}, state, {
      });
    case 'ADD_AID_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //update
    case 'UPDATE_AID_FULFILLED':
      for(let i = 0; i < state.aids.length; i++){
        let aid = Object.assign({}, state.aids[i]);
        if(aid._id === action.payload._id)
          aid = Object.assign({}, state.aids[i], action.payload);
        aids.push(aid);
      }
      return Object.assign({}, state, {
        aids: aids
      });
    case 'UPDATE_AID_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //delete
    case 'DELETE_AID_FULFILLED':
      for(let i = 0; i < state.aids.length; i++){
        let aid = Object.assign({}, state.aids[i]);
        if(aid._id !== action.payload._id)
          aids.push(aid);
      }
      return Object.assign({}, state, {
        aids: aids
      });
    case 'DELETE_AID_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //filter
    case 'FILTER_AIDS':
      if(action.payload.field === 'clear')
        return Object.assign({}, state, {
          filters: {}
        });
      return Object.assign({}, state, {
        filters: {
          ...state.filters,
          [action.payload.field]: action.payload.value
        }
      });

    //get all tags
    case 'FETCH_TAGS_FULFILLED':
      return Object.assign({}, state, {
        tags: action.payload.data
      });
    case 'FETCH_TAGS_REJECTED':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    default:
      return state;
  }
}
