// frontend/src/services/api.js
// Centralized Axios instance for API calls.

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Function to get all complaints
export const getComplaints = (page = 1) => api.get(`/complaints?page=${page}`);

// Function to get a single complaint by ID
export const getComplaintById = (id) => api.get(`/complaints/${id}`);

// Function to submit a new complaint
export const submitComplaint = (formData) => {
  return api.post('/complaints', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Function to upvote a complaint
export const upvoteComplaint = (id, userId) => api.post(`/complaints/${id}/upvote`, { userId });


// ADD THIS ENTIRE BLOCK
// This is an Axios interceptor. It "intercepts" every response from the API.
api.interceptors.response.use(
  // If the response is successful (status 2xx), just return it.
  (response) => {
    return response;
  },
  // If the response has an error...
  (error) => {
    // Check if the error is a 401 Unauthorized (which our server sends for an expired token).
    if (error.response && error.response.status === 401) {
      // If so, the token is bad. Log the user out.
      localStorage.removeItem('token');
      // Redirect to the login page.
      window.location.href = '/welcome';
      // You could also show a message here, e.g., "Your session has expired. Please log in again."
    }
    // Return the error to be handled by the component that made the call.
    return Promise.reject(error);
  }
);
export default api;