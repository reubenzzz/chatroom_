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

  apiKey: "AIzaSyAKKzuHQH0hn6UbcEipNtzpFftqR084S_s",

  authDomain: "chat-room-52503.firebaseapp.com",

  projectId: "chat-room-52503",

  storageBucket: "chat-room-52503.firebasestorage.app",

  messagingSenderId: "695986839118",

  appId: "1:695986839118:web:d2bea7f21fa481d47e2d1f",

  measurementId: "G-8B9Y89F92D"

};


// Initialize Firebase using the v9 modular approach
const app = initializeApp(firebaseConfig);

// Export Firebase services for use in other parts of the app
export const db = getFirestore(app);
// Fix: Initialize and export Firebase auth
export const auth = getAuth(app);
