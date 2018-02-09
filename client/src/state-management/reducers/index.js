import { combineReducers } from 'redux';
import AidReducer from './aids-reducer';
import UserReducer from './users-reducer';
import AuthReducer from './auth-reducer';
import PromptReducer from './prompt-reducer';



const reducers = {
  userStore: UserReducer,
  aidStore: AidReducer,
  authStore: AuthReducer,
  promptStore: PromptReducer
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
