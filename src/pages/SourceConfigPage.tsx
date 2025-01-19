import React, { useState, useEffect } from "react";
import {
  Slack,
  Mail,
  Globe,
  Twitter,
  Linkedin,
  Facebook,
  Check,
  X,
} from "lucide-react";
import {
  getSources,
  updateSource,
  Source as BaseSource,
} from "../services/sourceService";
import { populateSources } from "../services/populateSources";
import Modal from "../components/Modal";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

interface Source extends BaseSource {
  icon: React.ElementType;
}

const iconMap: Record<string, React.ElementType> = {
  Slack,
  Gmail: Mail,
  Website: Globe,
  Twitter,
  LinkedIn: Linkedin,
  Facebook,
};

function SourceConfigPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSource, setCurrentSource] = useState<Source | null>(null);

  useEffect(() => {
    const fetchAndPopulateSources = async () => {
      try {
        const fetchedSources = await getSources();
        if (fetchedSources.length === 0) {
          await populateSources();
          const newSources = await getSources();
          setSources(
            newSources.map((source) => ({
              ...source,
              icon: iconMap[source.name] || Globe,
            }))
          );
        } else {
          setSources(
            fetchedSources.map((source) => ({
              ...source,
              icon: iconMap[source.name] || Globe,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching or populating sources:", error);
      }
    };

    fetchAndPopulateSources();
  }, []);

  // Handle redirect result on page load
  useEffect(() => {
    const handleRedirectResult = async () => {
      const auth = getAuth();
      try {
        const result = await getRedirectResult(auth);
        if (result) {
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

          if (currentSource?.id) {
            toggleConnection(currentSource.id, true);
          }
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    handleRedirectResult();
  }, [currentSource]);

  const handleConnect = async (source: Source) => {
    try {
      if (source.name === "Gmail") {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        setCurrentSource(source); // Save the current source for after redirect
        await signInWithRedirect(auth, provider); // Use redirect method
      } else {
        setCurrentSource(source);
        setModalOpen(true);
      }
    } catch (error) {
      console.error(`Error connecting to ${source.name}:`, error);
    }
  };

  const handleDisconnect = async (source: Source) => {
    try {
      if (source.name === "Gmail") {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated.");
        }

        const userDocRef = doc(db, "users", user.uid, "connections", "gmail");
        await deleteDoc(userDocRef);

        if (!source.id) {
          console.error("Source ID is undefined. Cannot toggle connection.");
          return;
        }
        toggleConnection(source.id, false);
      } else {
        if (!source.id) {
          console.error("Source ID is undefined. Cannot toggle connection.");
          return;
        }
        toggleConnection(source.id, false);
      }
    } catch (error) {
      console.error(`Error disconnecting from ${source.name}:`, error);
    }
  };

  const toggleConnection = async (id: string, isConnected: boolean) => {
    if (!id) {
      console.error("Invalid source ID.");
      return;
    }

    const updatedSources = sources.map((source) =>
      source.id === id ? { ...source, isConnected } : source
    );
    setSources(updatedSources);

    try {
      await updateSource(id, { isConnected });
    } catch (error) {
      console.error("Error updating source:", error);
      setSources(sources); // Revert on failure
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      for (const source of sources) {
        if (source.id) {
          await updateSource(source.id, { isConnected: source.isConnected });
        } else {
          console.error("Source ID is undefined.");
        }
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Source Configuration</h1>
          <p className="mt-2 text-gray-600">
            Manage and configure your lead sources seamlessly
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sources.map((source) => (
            <div
              key={source.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {source.icon && <source.icon className="w-8 h-8 text-gray-700" />}
                  <h3 className="text-lg font-semibold text-gray-900">{source.name}</h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                    source.isConnected
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {source.isConnected ? <Check className="w-4 h-4 mr-1" /> : <X className="w-4 h-4 mr-1" />}
                  {source.isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <button
                onClick={() =>
                  source.isConnected ? handleDisconnect(source) : handleConnect(source)
                }
                className={`w-full py-2 px-4 rounded-md font-medium ${
                  source.isConnected
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {source.isConnected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 px-4 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className={`px-6 py-2 rounded-md font-medium ${
              isSaving ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </footer>

      {modalOpen && currentSource && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          source={{
            id: currentSource.id || "default-id",
            name: currentSource.name || "Unknown Source",
            isConnected: currentSource.isConnected ?? false,
          }}
          onComplete={(isConnected) => {
            if (currentSource?.id) {
              toggleConnection(currentSource.id, isConnected);
            }
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default SourceConfigPage;