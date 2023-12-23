import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-eEOTN3MqkDAtu_YbAB113AGMNnAXEw4",
  authDomain: "meditrackcr.firebaseapp.com",
  projectId: "meditrackcr",
  storageBucket: "meditrackcr.appspot.com",
  messagingSenderId: "994374709810",
  appId: "1:994374709810:web:0d4e9e02e475b5d416822b",
  measurementId: "G-2NMZ75C812"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

export {storage}