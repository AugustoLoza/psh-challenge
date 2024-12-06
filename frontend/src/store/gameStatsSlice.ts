import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';

interface Player {
  id: number;
  playerId: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
  score: number;
}

interface PlayersState {
  players: Player[];
  lastUpdated: string | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PlayersState = {
  players: [],
  lastUpdated: null,
  status: 'idle',
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';


export const fetchPlayers = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await axios.get(`${API_URL}/report/top-scores`);
  return response.data;
});

export const fetchLastUpdated = createAsyncThunk('players/fetchLastUpdated', async () => {
  const response = await axios.get(`${API_URL}/report/last-stats-time`);
  return response.data;
});

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.status = 'idle';
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchLastUpdated.fulfilled, (state, action: PayloadAction<string>) => {
        state.lastUpdated = action.payload;
      });
  },
});

export const selectPlayers = (state: RootState) => state.players.players;
export const selectLastUpdated = (state: RootState) => state.players.lastUpdated;

export default playersSlice.reducer;
