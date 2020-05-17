import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT
} from '../Constants.js'

const initialState = {
  user: {}
};

export default function(state = initialState, action){
  switch(action.type){
    case SIGN_IN:
      return{
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}