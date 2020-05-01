import { combineReducers } from 'redux';
import AuthReducer from './Auth/auth.reducer.js';

const RootReducer = combineReducers({
  auth: AuthReducer,
})

export default RootReducer;