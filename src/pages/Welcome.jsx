// frontend/src/pages/Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="max-w-sm w-full">
        <img src={logo} alt="Jan Suvida Logo" className="mx-auto h-40 w-auto mb-8" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/login/citizen')} // CHANGED
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login as Citizen
          </button>
          <button
            onClick={() => navigate('/under-development')} // CHANGED
            className="w-full bg-white text-blue-600 font-bold py-3 px-4 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Login as Administration
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;