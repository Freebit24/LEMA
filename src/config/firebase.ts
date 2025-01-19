// Import the functions from the SDKs
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjcPIV-ndBmJJYgdXpIiUrWGv9lOfTZg0",
  authDomain: "lema-ai.firebaseapp.com",
  projectId: "lema-ai",
  storageBucket: "lema-ai.firebasestorage.app",
  messagingSenderId: "784535824802",
  appId: "1:784535824802:web:2203fd3c99b23b3273eafb",
  measurementId: "G-8WDRK81WRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app); // Firebase Authentication
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); // Firestore Database
const storage = getStorage(app); // Cloud Storage



// Export Firebase services for use in other files
export { app, auth, googleProvider, db, storage };