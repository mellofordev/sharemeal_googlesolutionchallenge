
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCCoMQQvTJKfbQegRLovuIVJR7EV7NZ1Js",
  authDomain: "solution-5e665.firebaseapp.com",
  databaseURL: "https://solution-5e665-default-rtdb.firebaseio.com",
  projectId: "solution-5e665",
  storageBucket: "solution-5e665.appspot.com",
  messagingSenderId: "274830150510",
  appId: "1:274830150510:web:0acaef3521876261850f7f",
  measurementId: "G-67CSDNZ7ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore();
export {firestore,auth};


