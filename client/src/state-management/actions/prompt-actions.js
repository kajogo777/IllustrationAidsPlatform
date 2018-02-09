import client from '../feathers';
import store from '../store';

export function prompt(message, type, title=null, duration=3){
  setTimeout(() => {
    store.dispatch(destroyPrompt());
  }, duration*1000);
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
