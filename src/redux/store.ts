import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loadAllAuthData, storeAllAuthData } from '../auth/authLocalStorage';
import authReducer, { authLogin, authLogout, authRefresh } from '../auth/authSlice';
import { wildweatherApi, addTagTypes as wildweatherApiTags } from './api/wildweatherApi';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
    matcher: isAnyOf(authLogin, authRefresh, authLogout),
    effect: (action, listenerApi) => {
        switch (action.type) {
            case 'auth/authLogin':
                storeAllAuthData((listenerApi.getState() as AppRootState).auth);
                store.dispatch(wildweatherApi.util.invalidateTags([...wildweatherApiTags]));
                break;
            case 'auth/authRefresh':
                storeAllAuthData((listenerApi.getState() as AppRootState).auth);
                break;
            case 'auth/authLogout':
                storeAllAuthData({ userId: null, accessToken: null, refreshToken: null });
                store.dispatch(wildweatherApi.util.invalidateTags([...wildweatherApiTags]));
                break;
        }
    }
});

export const store = configureStore({
    preloadedState: {
        auth: loadAllAuthData()
    },
    reducer: {
        auth: authReducer,
        wildweatherApi: wildweatherApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        listenerMiddleware.middleware,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        wildweatherApi.middleware as any
    )
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;
