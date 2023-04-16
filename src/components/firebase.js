// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2IDA1fvK2fExGUW5NdFav9vK8tS14UnY",
  authDomain: "todo-5deba.firebaseapp.com",
  projectId: "todo-5deba",
  storageBucket: "todo-5deba.appspot.com",
  messagingSenderId: "1021175569529",
  appId: "1:1021175569529:web:52fb1d22f22c17697cc8a8",
  measurementId: "G-6H9PRHDP09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export {auth,provider};