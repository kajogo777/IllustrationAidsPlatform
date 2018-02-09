import client from '../feathers';

export function fetchAids(){
  return {
    type: 'FETCH_AIDS',
    payload: client.service("aids").find({})
  }
}
