import {createReducer} from '@reduxjs/toolkit';
import {setUser, clearUser} from './actions';

interface UserState {
  token: string;
}

const initialState: UserState = {
  token: '',
};

const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, action) => {
      state.token = action.payload.token;
    })
    .addCase(clearUser, state => {
      state.token = '';
    });
});

export default userReducer;
