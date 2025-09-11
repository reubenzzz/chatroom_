import React from 'react';
import { User } from 'firebase/auth';

interface WelcomeScreenProps {
  user: User;
  onSetRoom: (room: string) => void;
}

const RoomSelector: React.FC<WelcomeScreenProps> = ({ user, onSetRoom }) => {
  const handleStartChatting = () => {
    onSetRoom('strangerchat'); // Everyone joins the same public room
  };

  const initial = user.displayName?.charAt(0).toUpperCase() || '?';

  return (
    <div className="bg-[#1A162E]/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl text-center w-full max-w-md flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center gap-3 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63A13.067 13.067 0 0115 17.25a13.067 13.067 0 01-2.909-2.098.75.75 0 01-.364-.63l-.001-.12v-.002zM18 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63A13.067 13.067 0 0115 17.25a13.067 13.067 0 01-2.909-2.098.75.75 0 01-.364-.63l-.001-.12v-.002z" />
        </svg>
        <h2 className="text-3xl font-bold text-white">Chat Room</h2>
      </div>
      <p className="text-gray-400 !mb-6">Ready to start chatting?</p>
      
      <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-4xl font-bold text-white my-4">
        {initial}
      </div>

      <h3 className="text-2xl font-semibold text-white">Welcome, {user.displayName}!</h3>
      <p className="text-gray-400">Ready to meet someone new?</p>

      <button
        onClick={handleStartChatting}
        className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-indigo-500/50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
        </svg>
        <span>Start Chatting</span>
      </button>
    </div>
  );
};

export default RoomSelector;