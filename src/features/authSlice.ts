import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface User {
  fitnessLevel: string;
  goal: string;
  height: number | string;
  weight: number | string;
}

// Define the AuthState interface using the User type
export interface AuthState {
  user: User | null;
}

// Helper function to load user from localStorage
const loadUserFromLocalStorage = (): User | null => {
  if (typeof window !== 'undefined') { // Check if code is running in the browser
    try {
      const serializedUser = localStorage.getItem("user");
      if (serializedUser === null) {
        return null;
      }
      return JSON.parse(serializedUser);
    } catch (e) {
      console.warn("Failed to load user from localStorage", e);
      return null;
    }
  }
  return null;
};

// Helper function to save user to localStorage
const saveUserToLocalStorage = (user: User) => {
  if (typeof window !== 'undefined') { // Check if code is running in the browser
    try {
      const serializedUser = JSON.stringify(user);
      localStorage.setItem("user", serializedUser);
    } catch (e) {
      console.warn("Failed to save user to localStorage", e);
    }
  }
};

// Initialize the state without directly calling the localStorage function
const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuthState: (state) => {
      state.user = loadUserFromLocalStorage();
    },
    setAuth: (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.user = user;
      saveUserToLocalStorage(user); // Save user to localStorage
    },
    clearAuth: (state) => {
      state.user = null;
      if (typeof window !== 'undefined') { // Check if code is running in the browser
        localStorage.removeItem("user"); // Clear user from localStorage
      }
    },
  },
});

export const { initializeAuthState, setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
