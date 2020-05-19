const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = mongoose.Schema({
  project_name: {
    type: String,
    require: true,
    unique: true
  },
  project_details: {
    type: String,
    require: true
  },
  visibility: {
    type: String,
    require: true
  },
  created_by : {
    type : String,
    require: true
  },
  members: {
    type: [String],
  },
  todo: {
    type: [{
      todo: String,
      done: Boolean
    }]
  },
  members_count: {
    type: Number
  },
  starred: {
    type: Number
  },
  screenshots: {
    type: String
  },
  contributions: {
    type: String
  },
  chatGroups: [{
    room_name: {
      type: String,
      require: true
    },
    members: [],
    chats: []
  }],
  identifier: {
    type: String,
    default: function(){
      return this.created_by + "/" +  this.project_name 
    }
  }
},
{
  timestamps:{
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
})
const Project = mongoose.model('Project',projectSchema,'project');
module.exports = Project;