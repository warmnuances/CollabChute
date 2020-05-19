import Axios from 'axios';
import {
  ADD_MEMBER,
  ADD_TODOS,
  UPDATE_TODOS,
  ADD_PROJECT,
  GET_PROJECT,
  SIGN_IN
} from '../Constants.js';

let baseUrl;

if(process.env.NODE_ENV === "development"){
  baseUrl = "http://localhost:5000/v1/api/project";
}
else{
  baseUrl = "https://collabchute.herokuapp.com/v1/api/project";
}



export const addProject = ({name,details}, history) => dispatch => {
  Axios.defaults.withCredentials = true;
  Axios.post(baseUrl + "/add", {
    project_name: name,
    project_details: details
  }).then(response => {
    history.push(`/main/project/${name}`)
    dispatch({
      type: SIGN_IN,
      payload: response
    })
  })
  .catch(err => {
    console.log("/error")
    console.log(err.response)
  })
  
}
export const addTodos = (match, todoItem) => dispatch => {
  Axios.defaults.withCredentials = true;
  const projectName = match.params.projectname;

  Axios.post(baseUrl + "/todos/add" ,{
    project_name: projectName,
    todo: todoItem
  }).then(response => {

    dispatch({
      type: ADD_TODOS,
      payload: response.data
    })
  })
  .catch(err => {
    console.log(err)
  })

}

export const updateTodos = (match,todo) => dispatch => {
  Axios.defaults.withCredentials = true;
  const projectName = match.params.projectname;

  todo.done = !todo?.done;

  Axios.put(baseUrl + "/todos/update" ,{
    project_name: projectName,
    todo: todo
  }).then(response => {

    dispatch({
      type: UPDATE_TODOS,
      payload: response.data
    })
  })
  .catch(err => {
    console.log(err)
  })


}
export const getProject = (projectName) => dispatch => {
  Axios.defaults.withCredentials = true;
  // const projectName = match.params.projectname
  Axios
  .get(baseUrl + "/get", {
    params: {
      project_name: projectName,
    }
  })
  .then(response => {
    
    dispatch({
      type: GET_PROJECT,
      payload: response.data
    })
  })
  .catch(err => {
    console.log(err)
  })
}

export const addMember = (match, member) => dispatch => {
  Axios.defaults.withCredentials = true;
  const projectName = match.params.projectname;

  Axios.post(baseUrl + "/member/add", {
    project_name: projectName,
    new_user_email: member
  }).then(response => {
    dispatch({
      type: ADD_MEMBER,
      payload: response.data
    })
  })
  .catch(err => {
    console.log(err)
  })
}