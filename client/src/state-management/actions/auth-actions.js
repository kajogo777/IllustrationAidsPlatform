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

export function login(email, password){
  const userPromise = client.authenticate({
    strategy: 'local',
    email: email,
    password: password
  })
  .then(response => {
    return client.passport.verifyJWT(response.accessToken);
  })
  .then(payload => {
    store.dispatch(prompt("Logged in successfully", "success", null, 5));
    return client.service('users').get(payload.userId);
  })
  .catch(err => {
    store.dispatch(prompt("Log in Failed: " + err.message, "failure", null, 5));
    return new Promise((res, rej)=>{
      rej(err);
    });
  });

  return {
    type: 'LOGIN',
    payload: userPromise
  };
}
