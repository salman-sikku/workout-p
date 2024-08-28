import { configureStore } from "@reduxjs/toolkit";
import authReducer, { initializeAuthState } from "@/features/authSlice";
import adminReducer from "@/features/adminSlice";
import historyReducer, { initialHistoryState } from "@/features/historySlice";
import workoutReducer, {
  initializeWeekHistoryState,
} from "@/features/weekHistorySlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      admin: adminReducer,
      userHistory: historyReducer,
      weekHistory: workoutReducer,
    },
  });

  // Dispatch initializeAuthState to load user data from localStorage

  store.dispatch(initializeAuthState());
  store.dispatch(initialHistoryState());
  store.dispatch(initializeWeekHistoryState());

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
