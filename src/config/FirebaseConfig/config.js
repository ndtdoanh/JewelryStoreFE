


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBlOiY8IzIim1NgWTQvyJmNbOGiWni3mgQ",
    authDomain: "swd-jss.firebaseapp.com",
    projectId: "swd-jss",
    storageBucket: "swd-jss.appspot.com",
    messagingSenderId: "297919594424",
    appId: "1:297919594424:web:5758204cdfcc503be7194d",
    measurementId: "G-LT8GYFTMQW"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };