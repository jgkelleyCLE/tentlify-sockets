import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { activateLoad, addTentToLoad } from '../../../server/controllers/Load';

export const loadApi = createApi({
    reducerPath: 'loadApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tentlify-checklist.up.railway.app',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.user?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
        }

    }),
    tagTypes: ['Load'],
    endpoints: (builder) => ({
        getLoads: builder.query({
            query: ()=> ({
                url: '/api/loads',
                method: 'GET'
            }),
            providesTags: ['Load']
        }),
        getLoad: builder.query({
            query: (id)=> ({
                url: `/api/loads/load/${id}`,
                method: 'GET'
            }),
            providesTags: ['Load']
        }),
        getLoadByUser: builder.query({
            query: (userId)=> ({
                url: `/api/loads/user/${userId}`,
                method: 'GET'
            }),
            providesTags: ['Load']
        }),
        getAdminLoads: builder.query({
            query: (userId)=> ({
                url: `/api/loads/adminLoads/${userId}`,
                method: 'GET'
            }),
            providesTags: ['Load']
        }),
        createLoad: builder.mutation({
            query: (load)=> ({
                url: '/api/loads',
                method: 'POST',
                body: load
            }),
            invalidatesTags: ['Load']
        }),
        addUserToLoad: builder.mutation({
            query: ({id, userId})=> ({
                url: `/api/loads/${id}/addUser`,
                method: 'PUT',
                body: { userId }
            }),
            invalidatesTags: ['Load']
        }),
        removeUserFromLoad: builder.mutation({
            query: ({id, userId})=> ({
                url: `/api/loads/${id}/removeUser`,
                method: 'PUT',
                body: { userId }
            }),
            invalidatesTags: ['Load']
        }),
        addTentToLoad: builder.mutation({
            query: ({id, tentId})=> ({
                url: `/api/loads/${id}/addTent`,
                method: 'PUT',
                body: { tentId }
            }),
            invalidatesTags: ['Load']
        }),
        removeTentFromLoad: builder.mutation({
            query: ({id, tentId})=> ({
                url: `/api/loads/${id}/removeTent`,
                method: 'PUT',
                body: { tentId }
            }),
            invalidatesTags: ['Load']
        }),
        updateLoad: builder.mutation({
            query: ({id, title, users, tents})=> ({
                url: `/api/loads/${id}`,
                method: 'PUT',
                body: { title, users, tents }
            }),
            invalidatesTags: ['Load']
        }),
        deleteLoad: builder.mutation({
            query: ({id})=> ({
                url: `/api/loads/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Load']
        }),
        deactivateLoad: builder.mutation({
            query: ({id})=> ({
                url: `/api/loads/${id}/deactivate`,
                method: 'PUT'
            }),
            invalidatesTags: ['Load']
        }),
        activateLoad: builder.mutation({
            query: ({id})=> ({
                url: `/api/loads/${id}/activate`,
                method: 'PUT'
            }),
            invalidatesTags: ['Load']
        }),
        createLoadFromOrder: builder.mutation({
            query: ({ order }) => ({
                url: `/api/loads/create/${order._id}`,
                method: 'POST',
                body: {order}
            }),
            invalidatesTags: ['Load']
        }),
        createMutatedTent: builder.mutation({
            query: (tents) => ({
                url: '/api/loads/order/mutated',
                method: 'PUT',
                body: {tents}
            }),
            invalidatesTags: ['Load']
        })
    })
})

export const { useGetLoadsQuery, useGetLoadQuery, useCreateLoadMutation, useAddUserToLoadMutation, useRemoveUserFromLoadMutation, useUpdateLoadMutation, useDeleteLoadMutation, useAddTentToLoadMutation, useRemoveTentFromLoadMutation, useGetLoadByUserQuery, useGetAdminLoadsQuery, useDeactivateLoadMutation, useActivateLoadMutation, useCreateLoadFromOrderMutation, useCreateMutatedTentMutation } = loadApi