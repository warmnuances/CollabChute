import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT
} from '../Constants.js'

const initialState = {};

export default function(state = initialState, action){
  switch(action.type){
    case SIGN_IN:
      return{
        ...state,
        message: action.message
      }
    default:
      return state;
  }
}