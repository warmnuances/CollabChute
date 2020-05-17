import { combineReducers } from 'redux';
import AuthReducer from './Auth/auth.reducer.js';
import FilesReducer from './File/file.reducer.js';

const RootReducer = combineReducers({
  auth: AuthReducer,
  files: FilesReducer
})

export default RootReducer;