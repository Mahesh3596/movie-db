// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1jeWxCcyzDrXlCtCy2Vgw_v8ALkBQp-U",
  authDomain: "moviedb-61a89.firebaseapp.com",
  projectId: "moviedb-61a89",
  storageBucket: "moviedb-61a89.appspot.com",
  messagingSenderId: "832308285003",
  appId: "1:832308285003:web:547e9fee5825b1094947ce",
  measurementId: "G-VW9XBRTGBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);