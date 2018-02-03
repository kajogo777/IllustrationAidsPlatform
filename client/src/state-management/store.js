import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';


//promise trigger _Fulfilled , _Pending and _Rejected actions allow you to return promise
//thunk allows u to return functions
const middleware = applyMiddleware(promise(), thunk);

export default createStore(rootReducer, composeWithDevTools(middleware));
