
/* eslint-disable no-unused-vars */

// frontend/src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
// 1. Import useParams
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom'; 
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';
import logo from '../assets/logo.png';

function LoginPage() {
  const { role } = useParams(); // 2. Get the role from the URL
  
  // ... (useState, useContext, useNavigate, useLocation hooks remain the same)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // 3. Make the title dynamic
  const pageTitle = role === 'admin' ? 'Administration Log In' : 'Citizen Log In';
  const registerLink = role === 'admin' ? null : (
    <p className="text-center mt-6 text-sm text-gray-600">
      Don't have an account?{' '}
      <Link to="/register" className="font-bold text-blue-600 hover:underline">
        Sign Up
      </Link>
    </p>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // The backend will correctly identify if the user is an admin
      // No changes needed here
      navigate(from, { replace: true }); 
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-sm w-full">
        <img src={logo} alt="Jan Suvida Logo" className="mx-auto h-32 w-auto mb-6" />
        <button onClick={() => navigate('/welcome')} className="text-gray-600 hover:text-gray-800 mb-6 flex items-center">
          {/* ... back arrow svg ... */}
          Back to role selection
        </button>
        
        {/* 4. Use the dynamic title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{pageTitle}</h1>
        
        {/* The form remains exactly the same */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... input fields ... */}
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            required
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center">
            {loading ? <Spinner /> : 'Log In'}
          </button>
       

<button 
  type="button" 
  onClick={() => navigate('/under-development')} // ADD THIS LINE
  className="w-full bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors">
  Sign Up with Google
</button>
        </form>
        {/* 5. Conditionally show the register link */}
        {registerLink}
      </div>
    </div>
  );
}

export default LoginPage;