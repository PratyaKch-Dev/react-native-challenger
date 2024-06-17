import {createReducer} from '@reduxjs/toolkit';
import {setTransactions, setAvailable} from './actions';

interface TransactionsState {
  transactions: any[];
  available: number;
}

const initialState: TransactionsState = {
  transactions: [],
  available: 0,
};

const transactionsReducer = createReducer(initialState, builder => {
  builder
    .addCase(setTransactions, (state, action) => {
      state.transactions = action.payload.transactions;
    })
    .addCase(setAvailable, (state, action) => {
      state.available = action.payload;
    });
});

export default transactionsReducer;
