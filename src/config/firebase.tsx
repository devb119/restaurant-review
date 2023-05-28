// Import the functions you need from the SDKs you need

import Firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC9_QB_bmDfgX8xCpvL2EIYrfJ8T80ZyZE",
  authDomain: "restaurant-review-d9e95.firebaseapp.com",
  projectId: "restaurant-review-d9e95",
  storageBucket: "restaurant-review-d9e95.appspot.com",
  messagingSenderId: "927117356317",
  appId: "1:927117356317:web:714cf8b3e6da75f38205f4",
  measurementId: "G-KCQCJMKTPN"
};


// Initialize Firebase

const firebase = Firebase.initializeApp(firebaseConfig);
const analytics = Firebase.analytics(firebase);
const firestore = firebase.firestore();
const storage = firebase.storage();
export { firebase, analytics, firestore, storage };