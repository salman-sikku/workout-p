import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkoutData {
    day: string;
    workoutsCompleted: number;
}

const initialWorkoutData: WorkoutData[] = [
    { day: 'Mon', workoutsCompleted: 0 },
    { day: 'Tue', workoutsCompleted: 0 },
    { day: 'Wed', workoutsCompleted: 0 },
    { day: 'Thu', workoutsCompleted: 0 },
    { day: 'Fri', workoutsCompleted: 0 },
    { day: 'Sat', workoutsCompleted: 0 },
    { day: 'Sun', workoutsCompleted: 0 },
];

export const getCurrentWeekday = (): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    return days[today];
};

export const updateWorkoutData = (data: WorkoutData[], day: string, workoutLength: number): WorkoutData[] => {
    return data.map(item => item.day === day ? { ...item, workoutsCompleted: item.workoutsCompleted + workoutLength } : item);
};

export const loadWorkoutData = (): WorkoutData[] => {
    if (typeof window === 'undefined') return initialWorkoutData;
    
    const data = localStorage.getItem('workoutData');
    return data ? JSON.parse(data) : initialWorkoutData;
};

export const saveWorkoutData = (data: WorkoutData[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('workoutData', JSON.stringify(data));
        localStorage.setItem('lastUpdate', JSON.stringify(new Date().toISOString()));
    }
};

export const checkForWeekReset = (): boolean => {
    if (typeof window === 'undefined') return true;

    const lastUpdate = localStorage.getItem('lastUpdate');
    if (!lastUpdate) return true;

    const lastUpdateDate = new Date(JSON.parse(lastUpdate));
    const currentDate = new Date();
    const isMonday = currentDate.getDay() === 1;  // Check if today is Monday

    // If today is Monday and the last update wasn't today, reset the week
    if (isMonday && lastUpdateDate.getDay() !== 1) {
        return true;
    }

    const differenceInDays = (currentDate.getTime() - lastUpdateDate.getTime()) / (1000 * 3600 * 24);

    return differenceInDays >= 7;
};

const initialState = checkForWeekReset() ? initialWorkoutData : loadWorkoutData();

const workoutSlice = createSlice({
    name: 'weekHistory',
    initialState,
    reducers: {
        incrementWorkout(state, action: PayloadAction<number>) {
            const currentDay = getCurrentWeekday();
            const updatedState = updateWorkoutData(state, currentDay, action.payload);
            saveWorkoutData(updatedState);
            return updatedState;
        },
        setWorkoutData(state, action: PayloadAction<WorkoutData[]>) {
            const newState = action.payload;
            saveWorkoutData(newState);
            return newState;
        },
        initializeWeekHistoryState(state) {
            const data = loadWorkoutData();
            return checkForWeekReset() ? initialState : data;
        }
    },
});

export const { incrementWorkout, setWorkoutData, initializeWeekHistoryState } = workoutSlice.actions;
export default workoutSlice.reducer;
