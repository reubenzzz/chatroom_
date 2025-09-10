import React, { useEffect, useState, useRef } from 'react'
import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db, auth } from '../firebase'
import { 
  collection, 
  doc, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  serverTimestamp, 
  getDoc 
} from 'firebase/firestore'
import formatDate from '../utils/formatDate'



const q = query(collection(db, 'messages'), where('roomId', '==', id), orderBy('createdAt', 'asc'))
const unsub = onSnapshot(q, (snap) => {
setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
})


return () => unsub()
}, [id])


const sendMessage = async (e) => {
e?.preventDefault()
if (!text.trim()) return
if (!user) { alert('Please sign in to send messages.'); return }
try {
await addDoc(collection(db, 'messages'), {
roomId: id,
text: text.trim(),
uid: user.uid,
displayName: user.displayName || 'Anonymous',
photoURL: user.photoURL || null,
createdAt: serverTimestamp()
})
setText('')
} catch (err) {
console.error(err)
alert('Failed to send message')
}
}


if (room === null) return (
<div className="chatRoom">
<p>Room not found. <Link to="/">Back to rooms</Link></p>
</div>
)


return (
<div className="chatRoom">
<header className="chatHeader">
<Link to="/">← Rooms</Link>
<h3>{room?.title}</h3>
</header>


<div className="messages">
{messages.length === 0 && <p className="muted">No messages yet. Say hi 👋</p>}
{messages.map(m => (
<div key={m.id} className={`message ${m.uid === (user && user.uid) ? 'mine' : ''}`}>
{m.photoURL && <img src={m.photoURL} alt={m.displayName} className="avatar" />}
<div className="content">
<div className="meta"><strong>{m.displayName}</strong> <small>{formatDate(m.createdAt)}</small></div>
<div className="text">{m.text}</div>
</div>
</div>
))}
<div ref={bottomRef} />
</div>


<form onSubmit={sendMessage} className="messageForm">
<input value={text} onChange={e => setText(e.target.value)} placeholder="Type a message" />
<button className="btn" type="submit">Send</button>
</form>
</div>
)
}
