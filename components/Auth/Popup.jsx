import React from 'react';

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Forgot Password</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
