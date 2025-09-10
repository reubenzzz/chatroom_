import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'


export default function RoomsList() {
const [rooms, setRooms] = useState([])
const [title, setTitle] = useState('')


useEffect(() => {
const q = query(collection(db, 'rooms'), orderBy('createdAt', 'desc'))
const unsub = onSnapshot(q, (snap) => {
const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
setRooms(arr)
})
return () => unsub()
}, [])


const createRoom = async (e) => {
e.preventDefault()
if (!title.trim()) return
try {
await addDoc(collection(db, 'rooms'), {
title: title.trim(),
createdAt: new Date(),
slug: uuidv4().slice(0, 8)
})
setTitle('')
} catch (err) {
console.error(err)
alert('Failed to create room')
}
}


return (
<div className="rooms">
<h2>Chat Rooms</h2>
<form onSubmit={createRoom} className="roomForm">
<input value={title} onChange={e => setTitle(e.target.value)} placeholder="New room title" />
<button className="btn">Create</button>
</form>


<ul className="roomList">
{rooms.map(r => (
<li key={r.id} className="roomItem">
<Link to={`/room/${r.id}`}>{r.title}</Link>
<small>{r.slug}</small>
</li>
))}
</ul>
</div>
)
}
