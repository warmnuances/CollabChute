exports.JWT_KEY = "S3CR3T"

exports.shouldCompress = (req,res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }
  return compression.filter(req,res);
}

exports.firebaseConfig = {
  apiKey: "AIzaSyC_Lk49Np5IhxAEmX_s2Vy6xPprc6fb4X4",
  authDomain: "collabchute.firebaseapp.com",
  databaseURL: "https://collabchute.firebaseio.com",
  projectId: "collabchute",
  storageBucket: "collabchute.appspot.com",
  messagingSenderId: "722142906119",
  appId: "1:722142906119:web:a3361c6be83345316a67a2",
  measurementId: "G-ZE4Z082QJ5"
}