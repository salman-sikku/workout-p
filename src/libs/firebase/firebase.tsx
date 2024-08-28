import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBc05w3fAUqYW-KNAFM2wgG5jZ2KppnTo0",
  authDomain: "workout-planer-4dd7a.firebaseapp.com",
  projectId: "workout-planer-4dd7a",
  storageBucket: "workout-planer-4dd7a.appspot.com",
  messagingSenderId: "829438863313",
  appId: "1:829438863313:web:e1cf60adf1bf4da14262f0",
  measurementId: "G-P98VRTBNZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();