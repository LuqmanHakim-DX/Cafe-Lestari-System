// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBI5zK7BSDo0kO9M8q4BymU8BAI05ucdfM",
  authDomain: "cafesystem-4f55f.firebaseapp.com",
  projectId: "cafesystem-4f55f",
  storageBucket: "cafesystem-4f55f.firebasestorage.app",
  messagingSenderId: "350024644555",
  appId: "1:350024644555:web:2fd379c260ab5c178aa84e",
  measurementId: "G-GFDDH55D1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);
