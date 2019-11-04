import client from '../feathers';
import { prompt } from '../actions/prompt-actions';


export function fetchAids(offset = 0, limit = 30, terms = {}) {
  let searchItems = Object.assign({},
    ...Object.keys(terms).map(
      item => {
        if (item === "tags")
          return { [item]: { '$all': terms[item] } };
        return { [item]: { '$like': terms[item] } };
      }
    )
  );
  return {
    type: 'FETCH_AIDS',
    payload: client.service("aids").find({
      query: {
        $sort: {
          date_added: -1
        },
        $limit: limit,
        $skip: offset,
        ...searchItems
      }
    })
  }
}

export function addAid(aid) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_AID',
      payload: {
        promise: new Promise((resolve, reject) => {
          if (!aid.image_uri) {
            dispatch(prompt("Aid creation failed missing aid image", "failure", null, 5));
            reject();
          }
          client.service("aids").create(aid)
            .then(response => {
              dispatch(prompt("Aid created successfully", "success", null, 5));
              resolve(response);
            })
            .catch(error => {
              error.message = "make sure to fill all fields";
              dispatch(prompt("Aid creation failed " + error.message, "failure", null, 5));
              reject(error);
            });
        })
      }
    });
  };
}

export function updateAid(id, aid) {
  let result = { type: 'UPDATE_AID' };
  result.payload = client.service("aids").patch(id, aid)
  return result;
}

export function deleteAid(aid) {
  return {
    type: 'DELETE_AID',
    payload: client.service("aids").remove(aid._id)
  }
}

export function filterAids(field, value) {
  return {
    type: 'FILTER_AIDS',
    payload: { field: field, value: value }
  }
}

export function clearFilter() {
  return {
    type: 'FILTER_AIDS',
    payload: { field: "clear" }
  }
}


export function fetchTags() {
  return {
    type: 'FETCH_TAGS',
    payload: client.service("aids").find({
      query: {
        _aggregate: [
          { $unwind: "$tags" },
          { $group: { "_id": "$tags", "count": { $sum: 1 } } },
          { $group: { "_id": null, "all_tags": { $push: { "tag": "$_id", "count": "$count" } } } },
          { $project: { "_id": 0, "all_tags": 1 } }
        ]
      }
    })
  }
}

export function addTag(name) {
  return {
    type: 'ADD_TAG',
    payload: name
  }
}
