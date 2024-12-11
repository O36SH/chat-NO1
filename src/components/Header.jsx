import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Header() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src="/thirst.svg" alt="عطش" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">عطش</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <UserCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;