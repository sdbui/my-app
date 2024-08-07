import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import leadsReducer from './features/leads-slice';

export const store = configureStore({
  reducer: {
    authReducer,
    leadsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;