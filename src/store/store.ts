import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './ filtersSlice.ts';
import vacanciesReducer from './ vacanciesSlice.ts';


export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    vacancies: vacanciesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;