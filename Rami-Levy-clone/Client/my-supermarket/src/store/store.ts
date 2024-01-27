// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';

// Define your slices and reducers here
// For example:
// import counterReducer from '../features/counter/counterSlice';

const store = configureStore({
  reducer: {
    // Add your reducers here
    // counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
