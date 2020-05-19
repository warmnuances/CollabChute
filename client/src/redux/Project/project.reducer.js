import {
  ADD_MEMBER,
  UPDATE_TODOS,
  GET_PROJECT,
  ADD_TODOS,
  ADD_PROJECT,
} from '../Constants.js'

const initialState = {
  projectName: '',
  members: [],
  todos: [],
  projectDetail: '',
  chatTopic: null,
  createdBy: '',
  chatGroups: []
};

export default function(state = initialState, action){
  switch(action.type){
    case ADD_MEMBER:
      return{
        ...state,
        members: action.payload
      }
    case ADD_TODOS: 
      return{
        ...state,
        todos: action.payload
      }
    case UPDATE_TODOS:
      return{
        ...state,
        todos: action.payload.new_todo
      }
    case GET_PROJECT: 
      return{
        ...state,
        projectName: action.payload.project_name,
        members: action.payload.members,
        todos: action.payload.todo,
        projectDetail: action.payload.project_details,
        chatGroups: action.payload.chatGroups,
        createdBy: action.payload.created_by
      }
    default:
      return state;
  }
}