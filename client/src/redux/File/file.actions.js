import {
  ADD_FILES,
  LIST_FILES,
} from '../Constants.js'
import Axios from 'axios';


const baseUrl = "https://collabchute.herokuapp.com/v1/api/file";

export const addFile = (match, data) => dispatch =>{
  const projectName = match.params.projectname

  Axios.defaults.withCredentials = true;

  const formData  = new FormData();
  formData.append('file', data[0]);

  Axios.post(baseUrl+ "/upload", 
  formData,
  {
    withCredentials: true,
    params: {
      "project_name": projectName
    }
  })
  .then(response => {
    console.log("called")
    dispatch(listFiles(match))
  })
  .catch(err => {
    console.log(err);
  })
 

}
export const listFiles = (match) => dispatch => {
  const projectName = match.params.projectname
  Axios
    .get(baseUrl + '/list',{
      params: {
        project_name: projectName
      }
    })
    .then(response =>  {
      dispatch({
        type: LIST_FILES,
        payload: response.data
      })
    })
    .catch(err => {
      console.log(err)
    })
}