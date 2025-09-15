// frontend/src/index.js
// The main entry point for the React application.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with the provider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);