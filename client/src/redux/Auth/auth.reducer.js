import {
  SIGN_IN,
} from '../Constants.js'

const initialState = {
  user: { roles: [] }
};

export default function(state = initialState, action){
  switch(action.type){
    case SIGN_IN:
      return{
        ...state,
        user: action.payload.data
      }
    default:
      return state;
  }
}