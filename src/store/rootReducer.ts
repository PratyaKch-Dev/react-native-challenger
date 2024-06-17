import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import modalsReducer from './modals/reducers';
import transactionsReducer from './transactions/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  modals: modalsReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
