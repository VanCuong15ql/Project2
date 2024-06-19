import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue mb-8">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="bg-blue hover:opacity-[0.8] text-white font-bold py-2 px-4 rounded">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
