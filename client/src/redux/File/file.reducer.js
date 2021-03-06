import {
  LIST_FILES, ADD_FILES,
} from '../Constants.js'

const initialState = {
  files: []
};

export default function(state = initialState, action){
  switch(action.type){
    case LIST_FILES:
      return{
        ...state,
        files: action.payload
      }
    case ADD_FILES: 
      return{
        ...state,
        files: [...state.files,action.payload]
      }
    default:
      return state;
  }
}