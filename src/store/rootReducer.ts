import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/reducers';
import modalsReducer from './modals/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  modals: modalsReducer,
});

export default rootReducer;
