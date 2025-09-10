// Firebase modular v9 setup
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDAf8foqtCO70uwhpWP_SGZtipujb9_lNs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "chatroom-6564b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "chatroom-6564b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "chatroom-6564b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1010610090222",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1010610090222:web:36c92f45d4f0888d95c3ff",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RFMHW3XMYR"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
