// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9nd6M50p27vEaHQoqeQQ-sWQaP7THFUc",
  authDomain: "ionic2021-74a96.firebaseapp.com",
  databaseURL: "https://ionic2021-74a96-default-rtdb.firebaseio.com",
  projectId: "ionic2021-74a96",
  storageBucket: "ionic2021-74a96.appspot.com",
  messagingSenderId: "81672417569",
  appId: "1:81672417569:web:c8a7ffcfd9f639d80b0e60",
  measurementId: "G-L4DEPKP8WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("loading... ",app)
const analytics = getAnalytics(app);