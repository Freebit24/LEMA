// Lead type
export interface Lead {
  id: string;
  title: string;
  description: string;
  source: string;
  date: Date; // Changed to Date type
  tags: string[];
  status: LeadStatus; // Enum for status
}

// Enum for Lead statuses
export enum LeadStatus {
  New = "New",
  InProgress = "In Progress",
  Completed = "Completed",
}

// Source type
export interface Source {
  id: string; // Required for Firestore document management
  name: string; // Name of the source (e.g., Slack, Gmail, etc.)
  isConnected: boolean; // Connection state
  icon?: React.ElementType | null; // Optional icon component for UI display
  description?: string | null; // Optional description for UI or additional context
  lastSynced?: Date | null; // Optional: Track last sync time
  [key: string]: any; // Allow additional properties for flexibility
}

// User type (optional, if user management is part of your app)
export interface User {
  uid: string; // Unique user ID
  email: string; // User email
  displayName?: string; // Optional display name
  photoURL?: string; // Optional profile picture URL
  isEmailVerified: boolean; // Email verification status
  role?: UserRole; // Role-based access control
}

// Enum for User roles
export enum UserRole {
  Admin = "Admin",
  User = "User",
  Manager = "Manager", // Example additional role
}

// General API Response type (optional, for backend calls)
export interface ApiResponse<T> {
  data: T; // Generic type for response data
  success: boolean; // Indicates if the API call was successful
  message?: string; // Optional message for additional details
  error?: string | null; // Optional error message for failed responses
}