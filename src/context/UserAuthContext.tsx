import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import WaveForm from "../components/ui/WaveForm";

// Define the context value type
interface UserAuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, displayName: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
}

// Create the context with default values
const userAuthContext = createContext<UserAuthContextType | null>(null);

interface UserAuthContextProviderProps {
  children: ReactNode;
}

// Helper function for readable error messages
function getErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/user-not-found": "User not found. Please check your email.",
    "auth/email-already-in-use": "This email is already in use.",
    "auth/invalid-email": "Invalid email address.",
    "auth/weak-password": "Password is too weak. Please use a stronger password.",
    "auth/popup-closed-by-user": "Popup closed before signing in. Please try again.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    // Add other Firebase error codes here
  };

  return errorMessages[errorCode] || "An unexpected error occurred. Please try again.";
}

export function UserAuthContextProvider({ children }: UserAuthContextProviderProps) {
  const [state, setState] = useState<{
    user: User | null;
    isLoading: boolean;
    error: string | null;
  }>({
    user: null,
    isLoading: false,
    error: null,
  });
  const [loading, setLoading] = useState<boolean>(true); // App-level loading indicator

  const setError = (message: string | null) => {
    setState((prev) => ({ ...prev, error: message }));
  };

  async function logIn(email: string, password: string): Promise<UserCredential> {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setState((prev) => ({ ...prev, user: userCredential.user }));
      return userCredential;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  async function signUp(email: string, password: string, displayName: string): Promise<UserCredential> {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        await updateProfile(user, { displayName });
      }
  
      setState((prev) => ({ ...prev, user }));
      return userCredential;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }
  async function logOut(): Promise<void> {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await signOut(auth);
      setState((prev) => ({ ...prev, user: null }));
    } catch (err: any) {
      const errorMessage = "Logout failed. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  async function googleSignIn(): Promise<UserCredential> {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleAuthProvider);
      setState((prev) => ({ ...prev, user: result.user }));
      return result;
    } catch (err: any) {
      const errorMessage = getErrorMessage(err.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  async function resetPassword(email: string): Promise<void> {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
    } catch (err: any) {
      const errorMessage = "Failed to send password reset email.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setState((prev) => ({ ...prev, user: currentUser }));
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <WaveForm />;
  }

  return (
    <userAuthContext.Provider
      value={{
        user: state.user,
        isLoading: state.isLoading,
        error: state.error,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        resetPassword,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth(): UserAuthContextType {
  const context = useContext(userAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthContextProvider");
  }
  return context;
}