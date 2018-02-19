import client from '../feathers';

export function fetchAids(){
  return {
    type: 'FETCH_AIDS',
    payload: client.service("aids").find({})
  }
}

export function addAid(aid){
  return {
    type: 'ADD_AID',
    payload: client.service("aids").create(aid)
  }
}

export function updateAid(id, aid){
  return {
    type: 'UPDATE_AID',
    payload: client.service("aids").patch(id, aid)
  }
}

export function deleteAid(aid){
  return {
    type: 'DELETE_AID',
    payload: client.service("aids").remove(aid._id)
  }
}

export function filterAids(field, value){
  return {
    type: 'FILTER_AIDS',
    payload: {field: field, value: value}
  }
}
