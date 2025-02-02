import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Define the collection reference for sources
const sourcesCollection = collection(db, "sources");

// Type definition for a Source
export interface Source {
  id?: string; // Auto-generated by Firestore, optional for creating
  name: string; // Required field
  description?: string; // Optional field
  isConnected?: boolean; // Additional field for connection state
  connectionDetails?: any; // Additional field for storing connection-specific data
}

// Utility for standardized error handling
const handleError = (operation: string, error: any) => {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`Unable to ${operation}. Please try again later.`);
};

// Fetch all sources from Firestore
export const getSources = async (): Promise<Source[]> => {
  try {
    const snapshot = await getDocs(sourcesCollection);
    console.log("Fetched sources:", snapshot.docs.map((doc) => doc.data())); // Debug log
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Source));
  } catch (error) {
    console.error("Error fetching sources:", error);
    return []; // Gracefully handle error by returning an empty array
  }
};

// Create a new source in Firestore
export const createSource = async (data: Source): Promise<void> => {
  try {
    if (!data.name || typeof data.name !== "string") {
      throw new Error("Source name is required and must be a valid string.");
    }
    await addDoc(sourcesCollection, data);
    console.log("Source created successfully:", data); // Debug log
  } catch (error) {
    handleError("create source", error);
  }
};

// Update an existing source in Firestore
export const updateSource = async (id: string, data: Partial<Source>): Promise<void> => {
  try {
    if (!id) {
      throw new Error("Source ID is required for updating.");
    }
    const sourceDoc = doc(sourcesCollection, id);
    await updateDoc(sourceDoc, data);
    console.log(`Source with ID ${id} updated successfully:`, data); // Debug log
  } catch (error) {
    handleError("update source", error);
  }
};

// Delete a source from Firestore
export const deleteSource = async (id: string): Promise<void> => {
  try {
    if (!id) {
      throw new Error("Source ID is required for deletion.");
    }
    const sourceDoc = doc(sourcesCollection, id);
    await deleteDoc(sourceDoc);
    console.log(`Source with ID ${id} deleted successfully`); // Debug log
  } catch (error) {
    handleError("delete source", error);
  }
};

// Connect to a specific source
export const connectSource = async (id: string, connectionDetails: any): Promise<void> => {
  try {
    if (!id) {
      throw new Error("Source ID is required for connecting.");
    }
    const sourceDoc = doc(sourcesCollection, id);
    await updateDoc(sourceDoc, { isConnected: true, connectionDetails });
    console.log(`Source with ID ${id} connected successfully.`);
  } catch (error) {
    handleError("connect source", error);
  }
};

// Disconnect a specific source
export const disconnectSource = async (id: string): Promise<void> => {
  try {
    if (!id) {
      throw new Error("Source ID is required for disconnecting.");
    }
    const sourceDoc = doc(sourcesCollection, id);
    await updateDoc(sourceDoc, { isConnected: false, connectionDetails: null });
    console.log(`Source with ID ${id} disconnected successfully.`);
  } catch (error) {
    handleError("disconnect source", error);
  }
};