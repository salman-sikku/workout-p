import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface History {
  workoutHis: number;
  caloriesHis: number;
  TimeHis: number;
}

export interface HistoryState {
  history: History[];
}

const loadUserHistoryLocalStorage = (): History[] => {
  if (typeof window !== "undefined") {
    try {
      const serializedHistory = localStorage.getItem("historyDate");
      if (serializedHistory === null) {
        return [];
      }
      return JSON.parse(serializedHistory) as History[];
    } catch (error) {
      console.warn("Failed to load user history from localStorage", error);
      return [];
    }
  }
  return [];
};

const setUserHistoryLocalStorage = (history: History[]) => {
  if (typeof window !== "undefined") {
    try {
      const serializedHistory = JSON.stringify(history);
      localStorage.setItem("historyDate", serializedHistory);
    } catch (error) {
      console.warn("Failed to save user history to localStorage", error);
    }
  }
};

const initialState: HistoryState = {
  history: [],
};

const isDuplicateHistory = (historyArray: History[], newHistory: History): boolean => {
  return historyArray.some(
    (item) =>
      item.workoutHis === newHistory.workoutHis &&
      item.caloriesHis === newHistory.caloriesHis &&
      item.TimeHis === newHistory.TimeHis
  );
};

const authSlice = createSlice({
  name: "userHistory",
  initialState,
  reducers: {
    initialHistoryState: (state) => {
      state.history = loadUserHistoryLocalStorage();
    },
    addUserHistory: (state, action: PayloadAction<{ history: History }>) => {
      const newHistory = action.payload.history;
      if (!isDuplicateHistory(state.history, newHistory)) {
        state.history.push(newHistory);
        setUserHistoryLocalStorage(state.history);
      }
    },
    clearUserHistory: (state) => {
      state.history = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("historyDate");
      }
    },
  },
});

export const { initialHistoryState, addUserHistory, clearUserHistory } = authSlice.actions;
export default authSlice.reducer;
