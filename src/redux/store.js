import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import { authApi } from './Auth/authApi';
import { tentApi } from './tentApi';
import { userApi } from './userApi';
import { loadApi } from './loadApi';
import { mutatedApi } from './mutatedApi';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tentApi.reducerPath]: tentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [loadApi.reducerPath]: loadApi.reducer,
        [mutatedApi.reducerPath]: mutatedApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, tentApi.middleware, userApi.middleware, loadApi.middleware, mutatedApi.middleware)
})