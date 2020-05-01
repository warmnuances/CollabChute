const firebase = require("firebase/");
const { firebaseConfig } = require("../utils/config");

const firebaseInstance = firebase.initializeApp(firebaseConfig); 
const storage = firebaseInstance.storage();


module.exports= firebaseInstance;