import React from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface HeaderProps {
  user: User | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleSignOutClick = async () => {
    try {
      // Use the v9 signOut function
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-gray-900 shadow-md p-4 flex justify-between items-center flex-shrink-0">
      <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
        React FireChat
      </h1>
      {user && (
        <div className="flex items-center space-x-4">
          <span className="text-sm hidden sm:inline">{user.displayName}</span>
          <button
            onClick={handleSignOutClick}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;