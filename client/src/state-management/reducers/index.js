import { combineReducers } from 'redux';
import AidReducer from './aids-reducer';
import UserReducer from './users-reducer';
import AuthReducer from './auth-reducer';
import PromptReducer from './prompt-reducer';
import UploadReducer from './upload-reducer';
import ReservationReducer from './reservations-reducer';




const reducers = {
  userStore: UserReducer,
  aidStore: AidReducer,
  authStore: AuthReducer,
  promptStore: PromptReducer,
  uploadStore: UploadReducer,
  reservationStore: ReservationReducer,
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
