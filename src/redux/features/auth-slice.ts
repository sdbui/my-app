import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

type InitialState = {
  value: AuthState;
}

type AuthState = {
  isAuth: boolean;
  username: string;
  isAdmin: boolean
}

const initialState = {
  value: {
    isAuth: false,
    username: 'hellodefault',
    isAdmin: false
  } as AuthState
} as InitialState;

export const login = createAsyncThunk('auth/login', async () => {
  const response = await axios.post('http://localhost:3000/api/auth/login')
  return response.data;
})

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('http://localhost:3000/api/auth/logout')
  return response.data;
})

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export const { } = auth.actions;
export default auth.reducer;