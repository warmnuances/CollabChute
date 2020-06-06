import {
  SIGN_IN, SIGN_UP,
} from '../Constants.js'
import Axios from 'axios';
import { setLoading, setLoadFinished } from '../Loading/loader.action'


let baseUrl;

if(process.env.NODE_ENV === "development"){
  baseUrl = "http://localhost:5000/v1/api/user";
}
else{
  baseUrl = "https://collabchute.herokuapp.com/v1/api/user";
}

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

export const userSignIn = (history, data) => dispatch => {
  dispatch(setLoading());

  Axios.post(baseUrl + '/signin',data,{withCredentials: true})
  .then(response => {
    dispatch(setLoadFinished())

    sessionStorage.setItem("user", JSON.stringify(response.data))
    history.push("/main/home")

    dispatch({
      type: SIGN_IN,
      payload: response
    })
  })
  .catch(err => {
    dispatch(setLoadFinished())
    history.push("/error")
  })

}

export const userSignUp = (history, data) => dispatch => {
  const body = {
    email: data.email,
    password: data.password,
    confirm_password: data.confirm_password,
    name: data.name,
    username: data.name
  }

  dispatch(setLoading());


  Axios.post(baseUrl + '/signup',body,{withCredentials: true})
  .then(response => {
    dispatch(setLoadFinished())
    console.log(response)
    history.push(baseUrl +"/signin")
    dispatch({
      type: SIGN_UP,
      payload: response
    })
  })
  .catch(err => {
    dispatch(setLoadFinished())
    history.push("/error")
  })

}

export const userSignOut = (history) => dispatch =>{
  //TODO: invalidate tokens
  sessionStorage.removeItem("user");
  history.push("/auth/signin");
}