import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface
export interface Admin {
  _id: string;
  username : string;
}

// Define the AuthState interface using the User type
export interface adminState {
  user: Admin | null;
}

// Initialize the state without localStorage
const initialState: adminState = {
  user: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    initializeAdminState: (state) => {
      state.user = null; 
    },
    setAdmin: (state, action: PayloadAction<{ admin: Admin }>) => {
      const { admin } = action.payload;
      state.user = admin;
    },
  },
});

export const {  initializeAdminState, setAdmin } = adminSlice.actions;
export default adminSlice.reducer;
