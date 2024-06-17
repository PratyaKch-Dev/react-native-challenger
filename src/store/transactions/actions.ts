import {createAction} from '@reduxjs/toolkit';
import {SET_TRANSACTIONS, SET_AVAILABLE} from './constants';

export const setTransactions = createAction<{transactions: any[]}>(
  SET_TRANSACTIONS,
);
export const setAvailable = createAction<number>(SET_AVAILABLE);
