import React, { useState } from 'react';
import { DeletingAnimation } from './ui/DeletingAnimation'; // ✅ Import your animation component

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  // 🔄 State to handle the loading/deleting animation
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ Handle Confirm Button Click
  const handleConfirm = async () => {
    setIsDeleting(true); // Show the deleting animation
    await onConfirm(); // Wait for the deletion to complete
    setIsDeleting(false); // Hide the animation after deletion
  };

  // ✅ Conditional rendering for the deleting animation
  if (isDeleting) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <DeletingAnimation />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-6 transition-transform transform scale-105 hover:scale-100">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{message}</p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};