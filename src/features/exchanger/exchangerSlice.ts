import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ExchangeState {
  apiKey: string;
  uah_currencies_header: any[];
  currencies: string[];
}

interface GetExchangeArgs {
  currencyBase: string;
  targetCode: string;
}

const initialState: ExchangeState = {
  // apiKey: "sl019KNIxtWfvkwDtbX44yGdJYCB7bD9",
  apiKey: "8e3a026fbe1be88137e9cf1c",
  uah_currencies_header: [],
  currencies: ["EUR", "USD", "UAH"],
};

export const getExchange = createAsyncThunk(
  "weather",
  async (currency: GetExchangeArgs) => {
    const { currencyBase, targetCode } = currency;
    console.log(currencyBase, targetCode);

    try {
      const res = await fetch(
        // `https://api.apilayer.com/fixer/latest?base=UAH&symbols=${currency}&apikey=${initialState.apiKey}`
        // `https://v6.exchangerate-api.com/v6/${initialState.apiKey}/latest/${currency}`
        `https://v6.exchangerate-api.com/v6/${initialState.apiKey}/pair/${currencyBase}/${targetCode}`
      ).then((data) => data.json());

      return res;
    } catch (e) {
      console.error(e);
    }
  }
);

export const exchangerSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    // addCurrency: (state, action) => {
    //   state.uah_currencies.push(action.payload);
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getExchange.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state.uah_currencies_header.push(action.payload);
      }
    );
  },
});

export const {} = exchangerSlice.actions;

export const state = (state: RootState) => state.exchange;

export default exchangerSlice.reducer;
