import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
     }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ()=> ({
                url: '/api/users',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
    })
})

export const { useGetUsersQuery } = userApi