import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AppRootState } from '../redux/store';

export type AuthFullState = {
    userId: number | null;
    accessToken: string | null;
    refreshToken: string | null;
};

const initialState: AuthFullState = {
    userId: null,
    accessToken: null,
    refreshToken: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action: PayloadAction<AuthFullState>) => {
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        authRefresh: (state, action: PayloadAction<AuthFullState>) => {
            state.userId = action.payload.userId;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        authLogout: () => ({ ...initialState }),
        authReplaceAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        }
    }
});

export const {
    authLogin,
    authRefresh,
    authLogout,
    authReplaceAccessToken
} = authSlice.actions;

export const selectAuth = (state: AppRootState) => state.auth;
export const selectAuthUserId = (state: AppRootState) => state.auth.userId;
export const selectAuthAccessToken = (state: AppRootState) => state.auth.accessToken;
export const selectAuthRefreshToken = (state: AppRootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: AppRootState) => !!state.auth.userId;

export default authSlice.reducer;
