import client from '../feathers';
import { prompt } from '../actions/prompt-actions';

// export function addUser(name, email, password, mobileNumber){
//   return {
//     type: 'ADD_USER',
//     payload: client.service("users").create({
//       name: name,
//       email: email,
//       password: password,
//       mobileNumber: mobileNumber,
//       role: 'SERVANT',
//       status: 'PENDING'
//     })
//   }
// }

export function addUser(name, email, password, mobileNumber){
  return (dispatch) => {
    dispatch({
      type: 'ADD_USER',
      payload: {
        promise: new Promise((resolve, reject) => {
          client.service("users").create({
            name: name,
            email: email,
            password: password,
            mobileNumber: mobileNumber,
            role: 'SERVANT',
            status: 'PENDING'
          })
          .then(response => {
            resolve(response);
            dispatch(prompt(name + " registered successfully!", "success", null, 5));
          })
          .catch(err => {
            reject(err);
            dispatch(prompt("Registration failed: " + err, "failure", null, 10));
          })
        })
      }
    });
  };
}

export function fetchPendingUsers(){
  return {
    type: 'FETCH_PENDING_USERS',
    payload: client.service("users").find({query: {status: "PENDING"}})
  }
}

export function approvePendingUser(user){
  return {
    type: 'APPROVE_USER',
    payload: client.service("users").patch(user._id, {status: "CONFIRMED"})
  }
}

export function deleteUser(user){
  return {
    type: 'DELETE_USER',
    payload: client.service("users").remove(user._id)
  }
}
