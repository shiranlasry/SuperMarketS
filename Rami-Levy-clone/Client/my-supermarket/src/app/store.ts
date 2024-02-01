import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"; 
import loggesInUserReducer from "../features/logged_in_user/loggedInUserSlice";
import citiesReducer from "../features/cities/citiesSlice";
import streetsReducer from "../features/streets/streetsSlice";


export const store = configureStore({
  reducer: {
    loggedInUser: loggesInUserReducer,
    cities : citiesReducer,
    streets : streetsReducer,
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
