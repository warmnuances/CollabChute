import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT
} from '../Constants.js'
import Axios from 'axios';

const baseUrl = "https://collabchute.herokuapp.com/v1/api/user";

//Todo: Session management
export const renewToken = (history) => async dispatch => {

  // try{
  //   // const isLoggedIn = await Axios.post(baseUrl + '/renew');
  //   // console.log(isLoggedIn);

   
  // }
  // catch(err){
  //   if(err.response.status === 401){
  //     history.push("/auth/signIn")
  //   }
  // }

  let user = sessionStorage.getItem("user")

  if(user){
    dispatch({
      type: SIGN_IN,
      payload: JSON.parse(user)
    })  
  }
  else{
    history.push("/auth/signIn")
  }
}

export const userSignIn = (history, data) => async dispatch => {
  Axios.post(baseUrl + '/signin',data,{withCredentials: true})
  .then(response => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data))
      history.push("/main/home")
    dispatch({
      type: SIGN_IN,
      payload: response
    })
  })
  .catch(err => {
    console.log(err.response)
  })

}