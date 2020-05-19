import {
  LIST_FILES,
  ADD_FILES
} from '../Constants.js'
import Axios from 'axios';

let baseUrl;

if(process.env.NODE_ENV === "development"){
  baseUrl = "http://localhost:5000/v1/api/file";
}
else{
  baseUrl = "https://collabchute.herokuapp.com/v1/api/file";
}



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
    dispatch({
      type: ADD_FILES,
      payload: response.data.fileName
    })

  })
  .catch(err => {
    console.log(err);
  })
 

}
export const listFiles = (projectName) => dispatch => {
  Axios.defaults.withCredentials = true;
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

export const downloadFiles = (match, fileName) => dispatch => {
  const projectName = match.params.projectname;

  const fileNameExt = fileName.split("/").slice(1).join(",")
  Axios
  .get(baseUrl + '/download',{
    params: {
      project_name: projectName,
      file_name: fileName
    }
  })
  .then(response =>  {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileNameExt);
    document.body.appendChild(link);
    link.click();
  })
  .catch(err => {
    console.log(err)
  })
}