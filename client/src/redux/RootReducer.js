import { combineReducers } from 'redux';
import AuthReducer from './Auth/auth.reducer.js';
import FilesReducer from './File/file.reducer.js';
import LoadingReducer from './Loading/loader.reducer.js';
import ProjectReducer from './Project/project.reducer.js';

const RootReducer = combineReducers({
  auth: AuthReducer,
  files: FilesReducer,
  loading: LoadingReducer,
  project: ProjectReducer
})

export default RootReducer;