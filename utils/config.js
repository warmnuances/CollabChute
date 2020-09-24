const compression = require('compression');
const whitelist = [
  'https://collabchute.herokuapp.com',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:8080',
];


exports.JWT_KEY = "S3CR3T";

// exports._corsOption = process.env.NODE_ENV === 'prod'? {
//   origin: (origin,callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true
// }: {}

exports._corsOption = {
  origin: (origin,callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS: ' + whitelist ))
    }
  },
  credentials: true
}

// exports._corsOption ={}

exports.shouldCompress = (req,res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  return compression.filter(req,res);
}
