// frontend/src/components/ComplaintCard.jsx
import React from 'react';
// Make sure you have heroicons installed: npm install @heroicons/react
import { ArrowUpIcon, ShareIcon } from '@heroicons/react/24/outline';

function ComplaintCard({ complaint }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-200 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-200 text-blue-800';
      case 'RESOLVED': return 'bg-green-200 text-green-800';
      case 'REJECTED': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // --- Functions to handle clicks (for future use) ---
  const handleUpvote = (e) => {
    e.stopPropagation(); // Prevents clicking the whole card
    console.log(`Upvoting complaint ID: ${complaint.id}`);
    // Add your upvote API call logic here
  };

  const handleShare = (e) => {
    e.stopPropagation();
    console.log(`Sharing complaint ID: ${complaint.id}`);
    // Add your share logic here (e.g., using Web Share API)
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 md:flex-col md:flex-none flex">
      
      {complaint.image_data && (
        <img
          src={`data:${complaint.image_mimetype};base64,${complaint.image_data}`}
          alt="Complaint"
          className="w-1/3 h-auto object-cover md:w-full md:h-48"
        />
      )}
      
      {/* Container for the text content and actions */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                {complaint.status}
            </span>
            <span className="text-sm text-gray-500">
                {new Date(complaint.created_at).toLocaleDateString()}
            </span>
        </div>
        <p className="text-gray-700 flex-grow">{complaint.description}</p>
        
        {/* --- NEW: Action buttons section --- */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleUpvote}
            className="flex items-center space-x-2 hover:text-green-600 transition-colors"
          >
            <ArrowUpIcon className="h-5 w-5" />
            <span className="font-semibold">{complaint.upvotes} Upvotes</span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <ShareIcon className="h-5 w-5" />
            <span className="font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;