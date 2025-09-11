import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(true);

  const handleAuthAction = async (isSignUp: boolean, e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setIsSigningIn(!isSignUp);

    if (!email || !password) {
        setError("Email and password cannot be empty.");
        setLoading(false);
        return;
    }

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential.user) {
            const displayName = email.split('@')[0];
            await updateProfile(userCredential.user, { displayName });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password.');
          break;
        case 'auth/email-already-in-use':
          setError('This email address is already registered.');
          break;
        case 'auth/weak-password':
          setError('Password must be at least 6 characters long.');
          break;
        default:
          setError('An unexpected error occurred. Please try again.');
          console.error("Authentication error:", err);
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="bg-[#1A162E]/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63A13.067 13.067 0 0115 17.25a13.067 13.067 0 01-2.909-2.098.75.75 0 01-.364-.63l-.001-.12v-.002zM18 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63A13.067 13.067 0 0115 17.25a13.067 13.067 0 01-2.909-2.098.75.75 0 01-.364-.63l-.001-.12v-.002z" />
            </svg>
            <h2 className="text-3xl font-bold text-white">Chat Room</h2>
        </div>
        <p className="text-gray-400 mb-6">Sign in or create an account to start</p>
      <form>
        <div className="space-y-4">
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-gray-900/50 text-white p-3 rounded-lg border-2 border-gray-700 focus:outline-none focus:border-indigo-500 transition"
            aria-label="Email Address"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-gray-900/50 text-white p-3 rounded-lg border-2 border-gray-700 focus:outline-none focus:border-indigo-500 transition"
            aria-label="Password"
            />
        </div>

        {error && <p className="text-red-400 text-sm mt-4 text-left">{error}</p>}
        
        <div className="flex flex-col space-y-4 mt-6">
          <button 
            onClick={(e) => handleAuthAction(false, e)}
            disabled={loading && isSigningIn}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading && isSigningIn ? 'Signing In...' : 'Sign In'}
          </button>
          <button 
            onClick={(e) => handleAuthAction(true, e)}
            disabled={loading && !isSigningIn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading && !isSigningIn ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;