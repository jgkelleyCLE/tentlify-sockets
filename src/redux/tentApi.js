import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tentApi = createApi({
    reducerPath: 'tentApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tentlify-checklist.up.railway.app',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
        }
     }),
    tagTypes: ['Tent'],
    endpoints: (builder) => ({
        getTents: builder.query({
            query: ()=> ({
                url: '/api/tents',
                method: 'GET'
            }),
            providesTags: ['Tent']
        }),
        getTent: builder.query({
            query: (id) => ({
                url: `/api/tents/${id}`,
                method: 'GET'
            }),
            providesTags: ['Tent']
        }),
        getTentsByCategory: builder.query({
            query: (category) => ({
                url: `/api/tents/category/${category}`,
                method: 'GET'
            }),
            providesTags: ['Tent']
        }),
        updateTentPart: builder.mutation({
            query: ({ id, parts }) => ({
                url: `/api/tents/${id}/updatePart`,
                method: 'PUT',
                body: { parts }
            }),
            invalidatesTags: ['Tent']
        }),
        fetchTents: builder.query({
            query: ()=> ({
                url: '/api/tents/fetch',
                method: 'GET'
            }),
            providesTags: ['Tent']
        })
    })
})

export const { useGetTentsQuery, useGetTentQuery, useGetTentsByCategoryQuery, useUpdateTentPartMutation, useFetchTentsQuery } = tentApi;