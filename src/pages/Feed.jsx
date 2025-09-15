// frontend/src/pages/Feed.jsx
import React, { useState, useEffect } from 'react';
import { getComplaintById, getComplaints } from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import Spinner from '../components/Spinner';

function Feed() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const listResponse = await getComplaints();
        const complaintList = listResponse.data;
        const detailedComplaints = await Promise.all(
          complaintList.map(c => getComplaintById(c.id).then(res => res.data))
        );
        setComplaints(detailedComplaints);
      } catch (err) {
        setError('Failed to fetch complaints.');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  if (loading) return <div className="flex justify-center mt-16"><Spinner /></div>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Public Feed</h1>
      {/* ---- THIS IS THE ONLY LINE THAT CHANGED ---- */}
      <div className="flex flex-col gap-6">
        {complaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>
    </div>
  );
}

export default Feed;