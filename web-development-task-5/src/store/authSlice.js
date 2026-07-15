import { createSlice, nanoid } from "@reduxjs/toolkit";

// NOTE: This is a client-only auth flow — there's no backend, so passwords
// are stored in localStorage as plain text via redux-persist. That's fine
// for a local demo/portfolio app, but don't reuse this pattern for anything
// that touches real user data.

const initialState = {
  users: [], // { id, username, email, password }
  currentUserId: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: {
      reducer(state, action) {
        const { username, email, password } = action.payload;
        const emailTaken = state.users.some(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (emailTaken) {
          state.error = "An account with that email already exists.";
          return;
        }
        const id = nanoid();
        state.users.push({ id, username, email, password });
        state.currentUserId = id;
        state.error = null;
      },
      prepare({ username, email, password }) {
        return { payload: { username, email, password } };
      },
    },
    loginUser(state, action) {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!user || user.password !== password) {
        state.error = "Incorrect email or password.";
        return;
      }
      state.currentUserId = user.id;
      state.error = null;
    },
    logoutUser(state) {
      state.currentUserId = null;
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearAuthError } =
  authSlice.actions;

export const selectCurrentUser = (state) => {
  const { users, currentUserId } = state.auth;
  return users.find((u) => u.id === currentUserId) || null;
};

export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
