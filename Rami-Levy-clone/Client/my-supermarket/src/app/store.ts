import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"; 
import loggesInUserReducer from "../features/logged_in_user/loggedInUserSlice";
import citiesReducer from "../features/cities/citiesSlice";


export const store = configureStore({
  reducer: {
    loggedInUser: loggesInUserReducer,
    cities : citiesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
