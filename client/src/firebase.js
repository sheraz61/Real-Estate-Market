// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-87e9b.firebaseapp.com",
  projectId: "mern-estate-87e9b",
  storageBucket: "mern-estate-87e9b.firebasestorage.app",
  messagingSenderId: "386517651402",
  appId: "1:386517651402:web:6a36b7ea2e546579f58933"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);