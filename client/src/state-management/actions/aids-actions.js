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

export function updateAid(id, aid, file=null){
  let result = { type: 'UPDATE_AID' };

  if(file === null){
    result.payload = client.service("aids").patch(id, aid)
  } else {
    result.payload =  {
        promise: new Promise((resolve, reject) => {
          client.service("uploads").create({ uri: file })
          .then(response => {
            // would delete image if used by more that one aid
            // if(aid.image_uri && aid.image_uri !== response.id)
            //   client.service("uploads").remove(aid.image_uri);
            aid.image_uri = response.id;
            client.service("aids").patch(id, aid)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
          })
          .catch(error => {
            reject(error);
          })
        })
    }
  }

  return result;
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

export function clearFilter(){
  return {
    type: 'FILTER_AIDS',
    payload: {field: "clear"}
  }
}


export function fetchTags(){
  return {
    type: 'FETCH_TAGS',
    payload: client.service("aids").find({
      query: {
        _aggregate: [
          {$unwind:"$tags"},
          {$group:{"_id":"$tags","count":{$sum:1}}},
          {$group:{"_id":null,"all_tags":{$push:{"tag":"$_id", "count":"$count"}}}},
          {$project:{"_id":0,"all_tags":1}}
        ]
      }
    })
  }
}

export function addTag(name){
  return {
    type: 'ADD_TAG',
    payload: name
  }
}
