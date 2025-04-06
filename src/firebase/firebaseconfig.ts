// firebase.js
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


// Your original Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6dRC22bmr79LQBZ-ipoXhLJcyvpULizk",
  authDomain: "hala-b-saudi.firebaseapp.com",
  projectId: "hala-b-saudi",
  storageBucket: "hala-b-saudi.firebasestorage.app",
  messagingSenderId: "939551727593",
  appId: "1:939551727593:web:20cb4b5b1f39be1fa83578",
  measurementId: "G-3B770ZRGMK" // Optional for React Native
};

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export modules for use in your app
export { auth, firestore };


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA6dRC22bmr79LQBZ-ipoXhLJcyvpULizk",
//   authDomain: "hala-b-saudi.firebaseapp.com",
//   projectId: "hala-b-saudi",
//   storageBucket: "hala-b-saudi.firebasestorage.app",
//   messagingSenderId: "939551727593",
//   appId: "1:939551727593:web:20cb4b5b1f39be1fa83578",
//   measurementId: "G-3B770ZRGMK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
