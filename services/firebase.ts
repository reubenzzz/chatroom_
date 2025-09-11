import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Fix: Import getAuth from firebase/auth
import { getAuth } from "firebase/auth";

// =================================================================
// IMPORTANT: Replace this with your own Firebase project configuration
//
// 1. Go to the Firebase console (https://console.firebase.google.com/).
// 2. Create a new project or select an existing one.
// 3. Go to Project Settings > General tab.
// 4. Under "Your apps", click the web icon (</>) to add a new web app.
// 5. Follow the setup instructions and copy the config object here.
// 6. Enable Firestore Database in the Firebase console.
// =================================================================
const firebaseConfig = {

  apiKey: "AIzaSyDAf8foqtCO70uwhpWP_SGZtipujb9_lNs",
  
  authDomain: "chatroom-6564b.firebaseapp.com",
  
  projectId: "chatroom-6564b",
  
  storageBucket: "chatroom-6564b.firebasestorage.app",
  
  messagingSenderId: "1010610090222",
  
  appId: "1:1010610090222:web:36c92f45d4f0888d95c3ff",
  
  measurementId: "G-RFMHW3XMYR"

};


// Initialize Firebase using the v9 modular approach
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other parts of the app
export const db = getFirestore(app);
// Fix: Initialize and export Firebase auth
export const auth = getAuth(app);
