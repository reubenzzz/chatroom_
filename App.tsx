import React, { useState, useEffect } from 'react';
import JoinChat from './components/JoinChat';
import ChatRoom from './components/ChatRoom';

interface UserProfile {
  uid: string;
  displayName: string;
}

// Helper to get or create a unique user ID and store it locally
const getOrCreateUid = (): string => {
  let uid = localStorage.getItem('user-uid');
  if (!uid) {
    // Simple UID generator
    uid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem('user-uid', uid);
  }
  return uid;
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const room = 'strangerchat'; // All users join the same room

  useEffect(() => {
    // Attempt to load user profile from localStorage
    const savedUser = localStorage.getItem('chat-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleJoinChat = (displayName: string) => {
    const uid = getOrCreateUid();
    const newUserProfile: UserProfile = { uid, displayName };
    localStorage.setItem('chat-user', JSON.stringify(newUserProfile));
    setUser(newUserProfile);
  };
  
  const handleLeaveRoom = () => {
    localStorage.removeItem('chat-user');
    setUser(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1E1A3B] via-[#2a2252] to-[#3E2D63] text-gray-100 font-sans">
      <main className="flex-grow flex items-center justify-center p-4">
        {!user ? (
          <JoinChat onJoin={handleJoinChat} />
        ) : (
          <ChatRoom 
            user={user}
            room={room} 
            onLeaveRoom={handleLeaveRoom} 
          />
        )}
      </main>
    </div>
  );
};

export default App;