import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const isDevelopment = window.location.hostname === "localhost";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: isDevelopment,
});

export default store;
