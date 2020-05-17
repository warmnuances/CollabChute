const mongoose = require('mongoose');

const uri = "mongodb+srv://dev:ErxsyiZxbHG4c0dU@collabchute-users-bvvci.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('MongoDB Connected...')
})
.catch(err => console.log("ERROR", err));

module.exports = mongoose;



function dsdsa(){

}