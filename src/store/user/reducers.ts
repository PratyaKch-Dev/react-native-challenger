import {createReducer} from '@reduxjs/toolkit';
import {setUser, clearUser} from './actions';

interface UserState {
  token: string;
  phone: string;
}

const initialState: UserState = {
  token: '',
  phone: '',
};

const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, action) => {
      state.token = action.payload.token;
      state.phone = action.payload.phone;
    })
    .addCase(clearUser, state => {
      state.token = '';
      state.phone = '';
    });
});

export default userReducer;
