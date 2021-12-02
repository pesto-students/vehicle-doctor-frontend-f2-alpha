import firebase from 'firebase/app'
import 'firebase/auth'
//import env from "react-dotenv";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "vechile-doctor.firebaseapp.com",
  projectId: "vechile-doctor",
  storageBucket: "vechile-doctor.appspot.com",
  messagingSenderId: "343164359967",
  appId: "1:343164359967:web:580af945daff33092e4c2a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase
