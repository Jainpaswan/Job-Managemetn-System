import { createSlice } from "@reduxjs/toolkit";

// --- Safely load user data from localStorage ---
let storedUser = localStorage.getItem("user");
let parsedUser = null;

try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  // In case older data was stored as a plain string (like "jain@example.com")
  parsedUser = storedUser ? { email: storedUser, role: null } : null;
}

const initialState = {
  token: localStorage.getItem("token") || null,
  user: parsedUser, // now it's always an object { email, role }
};

// --- Redux Slice ---
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email, role } = action.payload;
      state.token = token;
      state.user = { email, role };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ email, role }));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
