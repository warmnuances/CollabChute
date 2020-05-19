import {
  SET_LOADING,
  SET_LOAD_FINISHED,
} from '../Constants.js'

export const setLoading = () => dispatch =>{
  dispatch({
    type: SET_LOADING,
  })
}
export const setLoadFinished = () => dispatch => {
  dispatch({
    type: SET_LOAD_FINISHED
  })
}