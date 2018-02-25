import client from '../feathers';

export function uploadFile(file){
  return {
    type: 'UPLOAD',
    payload: client.service("uploads").create({ uri: file })
  }
}
