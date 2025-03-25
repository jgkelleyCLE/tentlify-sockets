import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { editUser, removeTentFromFavorites } from '../../../server/controllers/Users';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tentlify-checklist.up.railway.app',
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
        addTentToFavorites: builder.mutation({
            query: ({tentId}) => ({
                url: '/api/users/favorite',
                method: 'POST',
                body: { tentId }
            }),
            invalidatesTags: ['User']
        }),
        removeTentFromFavorites: builder.mutation({
            query: ({tentId}) => ({
                url: '/api/users/favorite',
                method: 'DELETE',
                body: { tentId }
            }),
            invalidatesTags: ['User']
        }),
        getUserFavorites: builder.query({
            query: ()=> ({
                url: '/api/users/favorites',
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        getUser: builder.query({
            query: (id)=> ({
                url: `/api/users/${id}`,
                method: 'GET'
            }),
            providesTags: ['User']
        }),
        editUser: builder.mutation({
            query: (formData) => ({
                url: `/api/users/edit`,
                method: 'PUT',
                body: formData
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUsersQuery, useAddTentToFavoritesMutation, useRemoveTentFromFavoritesMutation, useGetUserFavoritesQuery, useGetUserQuery, useEditUserMutation } = userApi