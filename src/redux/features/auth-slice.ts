import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    login: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          isAdmin: false
        }
      }
    },
    toggleAdmin: (state) => {
      state.value.isAdmin = !state.value.isAdmin
    }
  }
});

export const { login, logout, toggleAdmin } = auth.actions;
export default auth.reducer;