import { configureStore } from '@reduxjs/toolkit';
import gameStatsReducer from './gameStatsSlice';

export const store = configureStore({
  reducer: {
    players: gameStatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
