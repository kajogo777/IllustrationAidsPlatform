import client from '../feathers';
import { prompt } from '../actions/prompt-actions';
import store from '../store';

export function logout(){
  store.dispatch(prompt("Logged out successfully", "success"));
  return {
    type: 'LOGOUT',
    payload: client.logout()
  };
}

export function login(username, password, jwt){
  let userPromise = null;

  if(jwt == null)
    userPromise = client.authenticate({
      strategy: 'local',
      username: username,
      password: password
    });
  else
    userPromise = client.authenticate();

  let loginPromise = userPromise
  .then(response => {
    return client.passport.verifyJWT(response.accessToken);
  })
  .then(payload => {
    if(jwt == null)
      store.dispatch(prompt("Logged in successfully", "success", null, 5));
    return client.service('users').get(payload.userId);
  })
  .catch(err => {
    if(jwt == null){
      store.dispatch(prompt("Log in Failed: " + err.message, "failure", null, 5));
      return new Promise((res, rej)=>{
        rej(err);
      });
    }
    client.logout();
  });

  return {
    type: 'LOGIN',
    payload: loginPromise
  };
}

export function updateAccount(user){
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_ACCOUNT',
      payload: {
        promise: new Promise((resolve, reject) => {
          client.service("users").patch(user._id, user)
          .then(response => {
            resolve(response);
            dispatch(prompt("Account updated successfully!", "success", null, 5));
          })
          .catch(err => {
            reject(err);
            dispatch(prompt("Update failed: " + err, "failure", null, 10));
          })
        })
      }
    })
  }
}
