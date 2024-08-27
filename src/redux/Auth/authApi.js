import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        googleSignIn: builder.mutation({
            query: (formData) => ({
                url: '/api/auth/google',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Auth']
        })
    })
})

export const { useGoogleSignInMutation } = authApi;