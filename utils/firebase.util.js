const {initializeApp} = require('firebase/app')
const { getStorage} =require('firebase/storage');
const dotenv = require("dotenv");
dotenv.config( {path:"./config.env"})


const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGE,
    appId: process.env.FIREBASE_APPID
  };


  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)

console.log(storage)
module.exports = { storage }