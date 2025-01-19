import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

// List of predefined platforms
const platforms = [
  { name: "Slack", description: "Team communication and collaboration platform", isConnected: false },
  { name: "Discord", description: "Voice, video, and text communication platform", isConnected: false },
  { name: "Gmail", description: "Email communication platform", isConnected: false },
  { name: "Twitter", description: "Social media and communication platform", isConnected: false },
  { name: "LinkedIn", description: "Professional networking platform", isConnected: false },
  { name: "Facebook", description: "Social media and networking platform", isConnected: false },
];

export const populateSources = async () => {
  const sourcesCollection = collection(db, "sources");
  try {
    for (const platform of platforms) {
      await addDoc(sourcesCollection, platform);
    }
    console.log("Predefined platforms added successfully!");
  } catch (error) {
    console.error("Error populating Firestore:", error);
  }
};