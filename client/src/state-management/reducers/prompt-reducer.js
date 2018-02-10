const defaultState = {
  prompt: {}
}

export default (state=defaultState, action={}) => {
  switch(action.type){
    case 'PROMPT':
      return {
        prompt: action.payload
      }
    case 'D_PROMPT':
      return defaultState
    default:
      return state;
  }
}
