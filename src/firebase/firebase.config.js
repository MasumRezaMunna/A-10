// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdbwzJGIkUvhn39Cfq_l02ZPDu9G5tg4w",
  authDomain: "moviemaster-pro-b6434.firebaseapp.com",
  projectId: "moviemaster-pro-b6434",
  storageBucket: "moviemaster-pro-b6434.firebasestorage.app",
  messagingSenderId: "297613559261",
  appId: "1:297613559261:web:0b45f346596db60b72a234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;