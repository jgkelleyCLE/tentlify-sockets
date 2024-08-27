import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mutatedApi = createApi({
    reducerPath: 'mutatedApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
        }
     }),
     tagTypes: ['Mutated'],
     endpoints: (builder) => ({
        updateMutatedTent: builder.mutation({
            query: ({ id, partId, updatedPart }) => ({
                url: `/api/mutated/${id}/updatePart`,
                method: 'PUT',
                body: { partId, updatedPart }
            }),
            invalidatesTags: ['Mutated']
        }),
        getMutatedTent: builder.query({
            query: (id) => ({
                url: `/api/mutated/${id}`,
                method: 'GET'
            }),
            providesTags: ['Mutated']
        })
     })
})

export const { useUpdateMutatedTentMutation, useGetMutatedTentQuery } = mutatedApi;