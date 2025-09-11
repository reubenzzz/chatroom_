import React from 'react';
import type { ChatMessage } from '../types';

interface MessageProps {
  message: ChatMessage;
  currentUserUid: string;
}

const Message: React.FC<MessageProps> = ({ message, currentUserUid }) => {
  const { text, uid, photoURL, displayName, createdAt } = message;
  const isCurrentUser = uid === currentUserUid;

  const formattedTime = createdAt?.toDate ? createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
  
  return (
    <div className={`flex items-start my-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <img 
        className="w-10 h-10 rounded-full" 
        src={photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${displayName}`} 
        alt={`${displayName}'s avatar`}
      />
      <div className={`mx-3 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-baseline space-x-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <p className="text-sm text-gray-400 font-semibold">{isCurrentUser ? 'You' : displayName}</p>
          <p className="text-xs text-gray-500">{formattedTime}</p>
        </div>
        <div className={`text-white p-3 rounded-lg mt-1 inline-block max-w-xs md:max-w-md ${isCurrentUser ? 'bg-indigo-500' : 'bg-gray-700'}`}>
          <p className="break-words text-left">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;