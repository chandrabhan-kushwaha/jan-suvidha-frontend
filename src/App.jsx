// frontend/src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import ReportForm from './pages/ReportForm';
import HomePage from './pages/HomePage'; // 1. Change import from Feed to HomePage
import Feed from './pages/Feed';       // 2. Import the new Feed page

import Track from './pages/Track';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Welcome from './pages/Welcome'; // Import Welcome page
import ProtectedRoute from './components/ProtectedRoute';
import AuthContext from './context/AuthContext';
import UnderDevelopment from './pages/UnderDevelopment'; // 1. Import the new page

// A new component to handle the layout
function AppLayout() {
  const location = useLocation();

  // --- THIS IS THE FIX ---
  // We now check if the path STARTS WITH the auth routes, instead of an exact match.
  const isAuthRoute = location.pathname.startsWith('/welcome') ||
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/under-development');

  const showHeader = !isAuthRoute;

  return (
    <div className="bg-gray-50 min-h-screen">
      {showHeader && <Header />}
      <main className={showHeader ? "container mx-auto p-4 md:p-8" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/under-development" element={<UnderDevelopment />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute>  <HomePage /></ProtectedRoute>} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed /> {/* 4. Add the new route for the feed */}
              </ProtectedRoute>
            }
          />

          <Route path="/report" element={<ProtectedRoute><ReportForm /></ProtectedRoute>} />
          <Route path="/track" element={<ProtectedRoute><Track /></ProtectedRoute>} />

          {/* Redirect non-matching routes */}
          <Route path="*" element={<AuthRedirect />} />
        </Routes>
      </main>
    </div>
  );
}

// This component handles the initial redirect logic
function AuthRedirect() {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <Spinner />; // Or a full page loader
  return user ? <Navigate to="/" /> : <Navigate to="/welcome" />;
}

// frontend/src/App.jsx
// ... (keep all your existing imports and the AppLayout component)

function App() {
  return (
    // This outer div centers the mobile frame on the screen
    <div className="flex justify-center">
      {/* This div is the mobile frame itself */}
      <div className="w-full max-w-sm h-screen bg-white shadow-2xl flex flex-col overflow-y-auto no-scrollbar">
        <Router>
          <AppLayout />
        </Router>
      </div>
    </div>
  );
}



// Need to import Navigate for the redirect
import { Navigate } from 'react-router-dom';

export default App;