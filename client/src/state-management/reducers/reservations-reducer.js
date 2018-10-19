const defaultState = {
  reservations: [],
  selected_reservations: [],
  user_reservations: [],
  filters: {
  }
}

export default (state=defaultState, action={}) => {
  let reservations = []

  switch(action.type){
    //fetch
    case 'FETCH_RESERVATIONS_PENDING':
      return state;
    case 'FETCH_RESERVATIONS_FULFILLED':
      return Object.assign({}, state, {
        reservations: action.payload.data
      });
    case 'FETCH_RESERVATIONS_REJECTED':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //get
    case 'GET_AID_RESERVATIONS_PENDING':
      return state;
    case 'GET_AID_RESERVATIONS_FULFILLED':
      return Object.assign({}, state, {
        selected_reservations: action.payload.data
      });
    case 'GET_AID_RESERVATIONS_REJECTED':
      return Object.assign({}, state, {
        error: action.payload.data
      });
    //get
    case 'GET_USER_RESERVATIONS_PENDING':
      return state;
    case 'GET_USER_RESERVATIONS_FULFILLED':
      return Object.assign({}, state, {
        user_reservations: action.payload.data
      });
    case 'GET_USER_RESERVATIONS_REJECTED':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //add
    case 'ADD_RESERVATION_FULFILLED':
      return Object.assign({}, state, {
        reservations: [...state.reservations, action.payload]
      });
    case 'ADD_RESERVATION_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //update
    case 'UPDATE_RESERVATION_FULFILLED':
      for(let i = 0; i < state.reservations.length; i++){
        let reservation = Object.assign({}, state.reservations[i]);
        if(reservation._id === action.payload._id)
          reservation = Object.assign({}, state.reservations[i], action.payload);
        reservations.push(reservation);
      }
      return Object.assign({}, state, {
        reservations: reservations
      });
    case 'UPDATE_RESERVATION_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //delete
    case 'DELETE_RESERVATION_FULFILLED':
      for(let i = 0; i < state.reservations.length; i++){
        let reservation = Object.assign({}, state.reservations[i]);
        if(reservation._id !== action.payload._id)
          reservations.push(reservation);
      }
      return Object.assign({}, state, {
        reservations: reservations
      });
    case 'DELETE_RESERVATION_REJECTEDs':
      return Object.assign({}, state, {
        error: action.payload.data
      });

    //filter
    case 'FILTER_RESERVATIONS':
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

    default:
      return state;
  }
}
