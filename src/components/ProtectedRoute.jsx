// frontend/src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // If the auth state is still loading, show a spinner
  // This prevents a flicker while the token is being verified
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // If loading is finished and there's no user, redirect to login
  if (!user) {
    // We pass the original location in the state
    // so we can redirect back after a successful login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, render the page they requested
  return children;
}

export default ProtectedRoute;