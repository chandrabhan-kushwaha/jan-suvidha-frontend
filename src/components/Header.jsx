// frontend/src/components/Header.jsx
import React, { useContext, useState } from 'react'; // 1. Import useState
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import logo from '../assets/logo.png';
import Modal from './Modal'; 

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 3. Add state to control the modal's visibility
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    // Use a Fragment (<>) to return multiple top-level elements
    <>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Jan Suvida Logo" className="h-12 w-auto" />
          </Link>

          {user && (
            // 4. Update the button to OPEN the modal instead of logging out directly
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              title="Logout"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </nav>
      </header>

      {/* 5. Add the Modal component here */}
      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsLogoutModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Header;