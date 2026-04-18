// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCgZCgl_Zx28-g8vKcbrd0OGD9Ln8BMio",
  authDomain: "quiz-app-b6350.firebaseapp.com",
  projectId: "quiz-app-b6350",
  storageBucket: "quiz-app-b6350.firebasestorage.app",
  messagingSenderId: "665023379709",
  appId: "1:665023379709:web:402a2423e419a26a822694"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);