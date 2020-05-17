import {
  ADD_FILES,
  LIST_FILES,
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
    default:
      return state;
  }
}