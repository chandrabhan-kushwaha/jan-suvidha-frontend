/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitComplaint } from '../services/api';
import Spinner from '../components/Spinner';

// Import your custom images for icons
import micIcon from '../assets/mic.png';
import cameraIcon from '../assets/camera.png';
import mapIcon from '../assets/map.png';

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const micAPI = SpeechRecognition ? new SpeechRecognition() : null;
if (micAPI) {
  micAPI.continuous = false;
  micAPI.interimResults = false;
  micAPI.lang = 'en-US';
}

function ReportForm() {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  // 1. Add state for the location method, defaulting to 'auto'
  const [locationMethod, setLocationMethod] = useState('auto');

  // ... (All useEffect hooks and the handleListen, handleImageChange, handleSubmit functions remain the same as before) ...
  useEffect(() => {
    if (!micAPI) return;

    const handleResult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setDescription(prev => prev + (prev ? " " : "") + transcript);
      setIsListening(false);
    };
    const handleError = (event) => { console.error("Speech recognition error", event); setIsListening(false); };
    const handleEnd = () => setIsListening(false);

    micAPI.addEventListener('result', handleResult);
    micAPI.addEventListener('error', handleError);
    micAPI.addEventListener('end', handleEnd);

    return () => {
      micAPI.removeEventListener('result', handleResult);
      micAPI.removeEventListener('error', handleError);
      micAPI.removeEventListener('end', handleEnd);
      if (isListening) micAPI.stop();
    };
  }, [isListening]);

  useEffect(() => {
    return () => { if (imagePreview) URL.revokeObjectURL(imagePreview); };
  }, [imagePreview]);

  const handleListen = () => {
    if (!micAPI) { setError("Voice input not supported by your browser."); return; }
    if (isListening) { micAPI.stop(); } else { setError(''); micAPI.start(); }
    setIsListening(!isListening);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImage(file); setImagePreview(URL.createObjectURL(file)); }
  };
  
const handleSubmit = async (e) => {
    e.preventDefault();
    // This validation check is now correct
    if (!description || !location.lat || !location.lon || !image || !category) {
      setError('Please add a photo, location, category, and description.');
      return;
    }
    
    // This is the logic that was missing
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    //const userId = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).id;
    formData.append('description', description);
    formData.append('latitude', location.lat);
    formData.append('longitude', location.lon);
    formData.append('image', image);
   // formData.append('userId', userId);
    formData.append('category', category);

    try {
      const response = await submitComplaint(formData);
      setSuccess(`Success! Complaint ID: ${response.data.complaintId}. You will be redirected shortly.`);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // This function now only handles the 'auto' logic
  const handleGetLocation = () => {
    setLoading(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude.toFixed(6),
          lon: position.coords.longitude.toFixed(6),
        });
        setLoading(false);
      },
      () => {
        setError('Could not get location. Please enable GPS and try again.');
        setLoading(false);
      }
    );
  };

  // 2. A new handler to decide which action to take
  const handleLocationAction = () => {
    if (locationMethod === 'auto') {
      handleGetLocation();
    } else {
      navigate('/under-development');
    }
  };

  const issueCategories = Array.from({ length: 10 }, (_, i) => `Issue ${i + 1}`);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Report a New Issue</h1>
        <p className="text-sm text-gray-500">Your report makes a difference.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
        {/* Photo Upload Section (Unchanged) */}
        <div className="bg-gray-50 p-3 rounded-lg border flex flex-col items-center">
            {imagePreview ? ( <div className="text-center w-full"> <img src={imagePreview} alt="Issue preview" className="w-full h-40 object-cover rounded-lg mb-2" /> <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="text-sm text-red-600 hover:underline">Remove Image</button> </div> ) : ( <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"> <img src={cameraIcon} alt="Camera Icon" className="w-12 h-12 mb-2" /> <span className="text-sm text-gray-600 font-medium">Add Photo of the Issue</span> </label> )}
            <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
        </div>

        {/* Location Section (Updated) */}
        <div className="bg-gray-50 p-3 rounded-lg border flex flex-col items-center">
          {/* 3. The new segmented control for choosing the method */}
          <div className="flex w-full bg-gray-200 rounded-lg p-1 mb-3">
            <button type="button" onClick={() => setLocationMethod('auto')} className={`w-1/2 rounded-md py-1 text-sm font-semibold transition-all ${locationMethod === 'auto' ? 'bg-white shadow text-blue-600' : 'bg-transparent text-gray-600'}`}>
              Auto
            </button>
            <button type="button" onClick={() => setLocationMethod('manual')} className={`w-1/2 rounded-md py-1 text-sm font-semibold transition-all ${locationMethod === 'manual' ? 'bg-white shadow text-blue-600' : 'bg-transparent text-gray-600'}`}>
              Manual
            </button>
          </div>
          
          {/* 4. The main button now uses the new handler */}
          <button
            type="button"
            onClick={handleLocationAction}
            className="w-full flex items-center justify-center py-2 bg-white text-gray-700 rounded-md border shadow-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={loading}
          >
            <img src={mapIcon} alt="Map Icon" className="w-5 h-5 mr-2" />
            {locationMethod === 'auto' ? 'Detect My Location' : 'Select on Map'}
          </button>
          
          {location.lat && location.lon && (
            <p className="text-xs text-gray-500 mt-2">Location Captured: Lat: {location.lat}, Lon: {location.lon}</p>
          )}
        </div>

        {/* Category Dropdown (Unchanged) */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category of Issue
          </label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="" disabled>Select a category</option>
            {issueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Description with Integrated Mic (Unchanged) */}
        <div className="relative">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe the Issue</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" rows="4" placeholder={isListening ? "Listening..." : "Speak or type your issue here..."} required />
          {micAPI && ( <button type="button" onClick={handleListen} className={`absolute right-2 top-8 p-1.5 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-200 text-gray-600'}`} title={isListening ? "Stop Listening" : "Start Voice Input"}> <img src={micIcon} alt="Mic Icon" className="w-5 h-5" /> </button> )}
        </div>

        {/* Spacer & Submit Button (Unchanged) */}
        <div className="flex-grow"></div>
        <div className="flex-shrink-0">
          {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
          {success && <p className="text-green-600 text-center text-sm mb-2">{success}</p>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center">
            {loading ? <Spinner /> : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportForm;