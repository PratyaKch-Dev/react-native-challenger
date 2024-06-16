import {createAction} from '@reduxjs/toolkit';
import {SET_USER, CLEAR_USER} from './constants';

export const setUser = createAction<{token: string}>(SET_USER);
export const clearUser = createAction(CLEAR_USER);
