// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2yjWqqIaqEhwP1ZYytrMU6-ZQSrxPV-o",
  authDomain: "chat-app-c0e7c.firebaseapp.com",
  projectId: "chat-app-c0e7c",
  storageBucket: "chat-app-c0e7c.appspot.com",
  messagingSenderId: "30878880069",
  appId: "1:30878880069:web:3c5258b8d18a22571dee2c",
  measurementId: "G-LPZYJZW00F",
  databaseURL: "https://chat-app-c0e7c-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);