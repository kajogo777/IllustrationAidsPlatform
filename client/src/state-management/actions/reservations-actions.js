import client from '../feathers';
import { prompt } from '../actions/prompt-actions';


export function fetchReservations(){
  return {
    type: 'FETCH_RESERVATIONS',
    payload: client.service("reservations").find({})
  }
}

export function addReservation(reservation){
  return (dispatch) => {
    dispatch({
      type: 'ADD_RESERVATION',
      payload: {
        promise: new Promise((resolve, reject) => {
          client.service("reservations")
          .create(reservation)
          .then(response => {
            resolve(response);
            dispatch(prompt("reserved aid successfully!", "success", null, 5));
          })
          .catch(err => {
            reject(err);
            dispatch(prompt("reservation failed: " + err, "failure", null, 10));
          })
        })
      }
    });
  };
}

export function updateReservation(id, reservation){
  return {
    type: 'UPDATE_RESERVATION',
    payload: client.service("reservations").patch(id, reservation)
  }
}

export function deleteReservation(reservation){
  return {
    type: 'DELETE_RESERVATION',
    payload: client.service("reservations").remove(reservation._id)
  }
}

export function filterReservations(field, value){
  return {
    type: 'FILTER_RESERVATIONS',
    payload: {field: field, value: value}
  }
}

export function clearFilter(){
  return {
    type: 'FILTER_RESERVATIONS',
    payload: {field: "clear"}
  }
}
