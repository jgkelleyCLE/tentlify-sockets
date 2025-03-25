import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth/authSlice';
import mapReducer from './mapSlice.js'
import loadReducer from './loadSlice.js'
import { authApi } from './Auth/authApi';
import { tentApi } from './tentApi';
import { userApi } from './userApi';
import { loadApi } from './loadApi';
import { mutatedApi } from './mutatedApi';
import { jobApi } from './jobApi';
import notificationReducer from './notificationSlice.js';
import { ordersApi } from './ordersApi.js';


export const store = configureStore({
    reducer:{
        auth: authReducer,
        map: mapReducer,
        load: loadReducer,
        notifications: notificationReducer,
        [authApi.reducerPath]: authApi.reducer,
        [tentApi.reducerPath]: tentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [loadApi.reducerPath]: loadApi.reducer,
        [mutatedApi.reducerPath]: mutatedApi.reducer,
        [jobApi.reducerPath]: jobApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, tentApi.middleware, userApi.middleware, loadApi.middleware, mutatedApi.middleware, jobApi.middleware, ordersApi.middleware)
})