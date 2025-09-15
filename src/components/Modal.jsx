// frontend/src/components/Modal.jsx
import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm animate-fade-in-up"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;