const defaultState = {
  uploadStatus: ''
}

export default (state=defaultState, action={}) => {
  switch(action.type){

    case 'UPLOAD_PENDING':
      console.log("pending ", action.payload);
      return Object.assign({}, state, {
        uploadStatus: 'Pending'
      });
    case 'UPLOAD_FULFILLED':
      console.log("fulfilled ", action.payload);
      return Object.assign({}, state, {
        uploadStatus: 'Done'
      });
    case 'UPLOAD_REJECTED':
      console.log("failed ", action.payload);
      return state

    default:
      return state;
  }
}
