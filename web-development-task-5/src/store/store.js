import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// redux-persist's own `redux-persist/lib/storage` import breaks under Vite's
// ESM/CJS interop (its default export doesn't unwrap, so storage.getItem is
// undefined). It's a thin wrapper around localStorage anyway, so we write it
// ourselves — same interface, no bundler weirdness.
const storage = {
  getItem(key) {
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem(key, value) {
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem(key) {
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

import authReducer from "./authSlice";
import tasksReducer from "./tasksSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

const persistConfig = {
  key: "localtasker",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);