// Lead type
export interface Lead {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string; // Consider using Date type instead of string for better handling
  tags: string[];
  status: "New" | "In Progress" | "Completed";
}

// Source type
export interface Source {
  id: string; // Required for Firestore document management
  name: string; // Name of the source (e.g., Slack, Gmail, etc.)
  isConnected: boolean; // Connection state
  icon?: React.ElementType; // Optional icon component for UI display
  description?: string; // Optional description for UI or additional context
  lastSynced?: string | Date; // Optional: Track last sync time
  [key: string]: any; // Allow additional properties for flexibility
}

// User type (optional, if user management is part of your app)
export interface User {
  uid: string; // Unique user ID
  email: string; // User email
  displayName?: string; // Optional display name
  photoURL?: string; // Optional profile picture URL
  isEmailVerified: boolean; // Email verification status
  role?: "Admin" | "User"; // Optional: Role-based access control
}

// General API Response type (optional, for backend calls)
export interface ApiResponse<T> {
  data: T; // Generic type for response data
  success: boolean; // Indicates if the API call was successful
  message?: string; // Optional message for additional details
}