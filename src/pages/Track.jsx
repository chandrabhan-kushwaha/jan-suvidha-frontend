// frontend/src/pages/Track.jsx

import React, { useState } from 'react';
import { getComplaintById } from '../services/api';
import Spinner from '../components/Spinner';

function Track() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!complaintId) {
      setError('Please enter a Complaint ID.');
      return;
    }
    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const response = await getComplaintById(complaintId);
      setComplaint(response.data);
    } catch (err) {
      setError('Complaint not found. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Track Your Complaint</h1>
        <form onSubmit={handleTrack}>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter Complaint ID"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:bg-blue-300">
              Track
            </button>
          </div>
        </form>
      </div>

      {loading && <div className="flex justify-center"><Spinner /></div>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {complaint && (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
          <p><strong>ID:</strong> {complaint.id}</p>
          <p><strong>Status:</strong> <span className="font-semibold">{complaint.status}</span></p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Reported On:</strong> {new Date(complaint.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Track;