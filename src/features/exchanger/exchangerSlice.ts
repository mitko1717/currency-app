import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ExchangeState {
  value: number;
  apiKey: string;
}

const initialState: ExchangeState = {
  value: 0,
  apiKey: "sl019KNIxtWfvkwDtbX44yGdJYCB7bD9",
};

export const getExchange = createAsyncThunk("weather", async (currency: string) => {  
  try {
    const res = await fetch(
      `https://api.apilayer.com/fixer/latest?base=UAH&symbols=${currency}&apikey=${initialState.apiKey}`
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
