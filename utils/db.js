const mongoose = require('mongoose');

const uri = "mongodb+srv://dev:ErxsyiZxbHG4c0dU@collabchute-users-bvvci.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  useCreateIndex: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

module.exports = mongoose;