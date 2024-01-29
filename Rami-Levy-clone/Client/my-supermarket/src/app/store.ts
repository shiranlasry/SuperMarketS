// src/store/store.ts
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";



const store = configureStore({
  reducer: {
    // Add your reducers here
    // counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
