import client from '../feathers';
import store from '../store';

export function prompt(message, type, title=null, duration=3){
  setTimeout(() => {
    store.dispatch(destroyPrompt());
  }, 3000);
  return {
    type: 'PROMPT',
    payload: {
      message,
      type,
      title,
      duration
    }
  }
}

export function destroyPrompt(){
  return {
    type: 'D_PROMPT'
  }
}
