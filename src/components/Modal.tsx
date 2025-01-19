import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: { id: string; name: string; isConnected: boolean };
  onComplete: (isConnected: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, source, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const token = GoogleAuthProvider.credentialFromResult(result)?.accessToken;
      const user = result.user;

      if (!token || !user) {
        throw new Error("Authentication failed. Missing token or user information.");
      }

      const userDocRef = doc(db, "users", user.uid, "connections", "gmail");
      await setDoc(userDocRef, {
        accessToken: token,
        email: user.email,
        connectedAt: new Date().toISOString(),
      });

      onComplete(true);
      onClose();
    } catch (err: any) {
      console.error("Error connecting Gmail:", err);
      setError(
        err.message ||
          "An unknown error occurred while connecting Gmail. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("No authenticated user found.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid, "connections", "gmail");
      await deleteDoc(userDocRef);

      onComplete(false);
      onClose();
    } catch (err: any) {
      console.error("Error disconnecting Gmail:", err);
      setError(
        err.message ||
          "An unknown error occurred while disconnecting Gmail. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 id="modal-title" className="text-xl font-bold mb-4">
          {source.name} Integration
        </h2>
        <p id="modal-description" className="text-gray-600 mb-6">
          {source.name === "Gmail"
            ? "Authorize access to your Gmail account to integrate with this platform."
            : `Connect your ${source.name} account for integration.`}
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          {!source.isConnected ? (
            <button
              className={`px-4 py-2 rounded-md font-medium ${
                isLoading
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect"}
            </button>
          ) : (
            <button
              className={`px-4 py-2 rounded-md ${
                isLoading
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              onClick={handleDisconnect}
              disabled={isLoading}
            >
              {isLoading ? "Disconnecting..." : "Disconnect"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;