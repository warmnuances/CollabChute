import {
  SET_LOADING,
  SET_LOAD_FINISHED,
} from '../Constants.js'

const initialState = {
  loader: false
};

export default function(state = initialState, action){
  switch(action.type){
    case SET_LOADING:
      return{
        ...state,
        loader: true
      }
    case SET_LOAD_FINISHED:
      return{
        ...state,
        loader: false
      }
    default:
      return state;
  }
}