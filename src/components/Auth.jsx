import React from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'


export default function Auth({ user }) {
const signIn = async () => {
try {
await signInWithPopup(auth, googleProvider)
} catch (err) {
console.error('Sign-in error', err)
alert('Sign-in failed: ' + err.message)
}
}


const signOutUser = async () => {
await signOut(auth)
}


return (
<div className="auth">
{user ? (
<div className="userInfo">
<img src={user.photoURL} alt={user.displayName} className="avatar" />
<span>{user.displayName}</span>
<button onClick={signOutUser}>Sign out</button>
</div>
) : (
<button onClick={signIn} className="btn-primary">Sign in with Google</button>
)}
</div>
)
}
