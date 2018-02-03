import { combineReducers } from 'redux';
import AidReducer from './aid-reducer';
import AuthReducer from './auth-reducer';
import PromptReducer from './prompt-reducer';



const reducers = {
  aidStore: AidReducer,
  authStore: AuthReducer,
  promptStore: PromptReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
