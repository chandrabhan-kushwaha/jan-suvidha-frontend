// frontend/src/pages/UnderDevelopment.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnderDevelopment() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <div className="max-w-md">
        {/* Hardhat Icon SVG */}
      <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="mx-auto h-24 w-24 text-blue-600"
>
  <path
    fillRule="evenodd"
    d="M11.983 2.25a9.72 9.72 0 0 0-1.763.16.75.75 0 0 0-.606.67l-.138 1.374a7.49 7.49 0 0 0-1.334.548l-1.23-.711a.75.75 0 0 0-.95.22 9.72 9.72 0 0 0-.902 1.56.75.75 0 0 0 .33 1.004l1.174.68a7.62 7.62 0 0 0-.003 1.433l-1.17.678a.75.75 0 0 0-.331 1.003c.244.554.55 1.073.902 1.56a.75.75 0 0 0 .95.22l1.23-.711c.423.234.867.423 1.334.548l.138 1.374a.75.75 0 0 0 .606.67c.58.104 1.174.16 1.763.16s1.183-.056 1.763-.16a.75.75 0 0 0 .606-.67l.138-1.374a7.49 7.49 0 0 0 1.334-.548l1.23.711a.75.75 0 0 0 .95-.22c.352-.487.658-1.006.902-1.56a.75.75 0 0 0-.33-1.004l-1.174-.68a7.62 7.62 0 0 0 .003-1.433l1.17-.678a.75.75 0 0 0 .331-1.003 9.72 9.72 0 0 0-.902-1.56.75.75 0 0 0-.95-.22l-1.23.711a7.49 7.49 0 0 0-1.334-.548l-.138-1.374a.75.75 0 0 0-.606-.67 9.72 9.72 0 0 0-1.763-.16Z"
    clipRule="evenodd"
  />
  <path
    fillRule="evenodd"
    d="M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
    clipRule="evenodd"
  />
</svg>

        <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
          Feature Under Development
        </h1>
        <p className="text-gray-600 mb-8">
         WE ARE WORKING ON THIS FEATURE <br />
         IT WILL AVAILABLE VERY SOON......
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnderDevelopment;