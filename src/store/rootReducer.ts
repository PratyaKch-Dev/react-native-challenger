import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './user/reducers';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
