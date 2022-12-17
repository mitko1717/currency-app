import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ExchangeState {
  value: number;
}

const initialState: ExchangeState = {
  value: 0,
};

export const getExchange = createAsyncThunk("weather", async (city: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=&units=metric`
    ).then((data) => data.json());

    return res;
  } catch (e) {
    console.error(e);
  }
});

export const exchangerSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExchange.fulfilled, (state) => {
        state.value = 0;
      })
  },
});

export const { increment } = exchangerSlice.actions;

export const state = (state: RootState) => state.exchange;

export default exchangerSlice.reducer;
