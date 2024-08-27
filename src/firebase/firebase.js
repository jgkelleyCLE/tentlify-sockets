// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj6uVnIMvnscEGuaoILC2qSWcmBPVuVd8",
  authDomain: "collab-checklist.firebaseapp.com",
  projectId: "collab-checklist",
  storageBucket: "collab-checklist.appspot.com",
  messagingSenderId: "590863027170",
  appId: "1:590863027170:web:8bfb5254c1caf6083dc7bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);