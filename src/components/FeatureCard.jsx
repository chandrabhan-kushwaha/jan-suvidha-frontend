// frontend/src/components/FeatureCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function FeatureCard({ to, icon, title }) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center p-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:-translate-y-1">
      <div className="h-10 w-10 mb-2">{icon}</div>
      <span className="font-semibold text-sm text-center">{title}</span>
    </Link>
  );
}

export default FeatureCard;