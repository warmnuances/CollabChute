const mongoose = require("mongoose");

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
  created_by : {
    type : String,
    require: true
  },
  members: {
    type: [String],
  },
  todo: {
    type: [String]
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