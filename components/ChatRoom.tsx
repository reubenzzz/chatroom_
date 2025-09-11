import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { ChatMessage } from '../types';
import Message from './Message';

interface ChatRoomProps {
  room: string;
  user: { uid: string; displayName: string };
  onLeaveRoom: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room, user, onLeaveRoom }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const messagesCollectionRef = collection(db, 'messages');
    
    const q = query(
      messagesCollectionRef,
      where('room', '==', room),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages: ChatMessage[] = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id } as ChatMessage);
      });
      setMessages(fetchedMessages.reverse()); // Reverse to show latest at the bottom
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !user) return;

    const { uid, displayName } = user;
    const messagesCollectionRef = collection(db, 'messages');
    
    await addDoc(messagesCollectionRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      photoURL: null,
      room,
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl bg-[#1A162E]/80 backdrop-blur-sm shadow-2xl rounded-lg overflow-hidden">
      <header className="bg-gray-900/50 p-4 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
        <h2 className="text-xl font-bold text-white">
          Chat Room
        </h2>
        <div className="flex items-center space-x-2">
            <button 
            onClick={onLeaveRoom}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
            Change Name
            </button>
        </div>
      </header>

      <div className="flex-grow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">No messages yet. Say hi!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <Message key={msg.id} message={msg} currentUserUid={user.uid}/>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-900/50 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-900/50 text-white p-3 rounded-l-lg border-2 border-transparent focus:outline-none focus:border-indigo-500 transition"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold p-3 rounded-r-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
             </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;