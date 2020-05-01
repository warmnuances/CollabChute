import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import RootReducer from './RootReducer.js';

const initialState = {};

const middleware = [thunk,logger];

const store = createStore(
  RootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
)

export default store;