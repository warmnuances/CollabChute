import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './RootReducer.js';

const initialState = {};

let middleware;

if(process.env.NODE_ENV === "development"){
  middleware = [thunk,logger];
}
else{
  middleware = [thunk];
}

const store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
)

export default store;