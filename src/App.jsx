import React, { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import Auth from './components/Auth'
import RoomsList from './components/RoomsList'
import ChatRoom from './components/ChatRoom'


export default function App() {
const [user, setUser] = useState(null)


useEffect(() => {
const unsub = onAuthStateChanged(auth, u => setUser(u))
return () => unsub()
}, [])


return (
<div className="app">
<nav className="nav">
<Link to="/" className="brand">MultiChat</Link>
<Auth user={user} />
</nav>


<main>
<Routes>
<Route path="/" element={<RoomsList />} />
<Route path="/room/:id" element={<ChatRoom user={user} />} />
</Routes>
</main>


<footer className="footer">
<small>Built with ❤️ • React + Firebase</small>
</footer>
</div>
)
}
