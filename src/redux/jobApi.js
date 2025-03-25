import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jobApi = createApi({
    reducerPath: 'jobApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tentlify-checklist.up.railway.app',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.user?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
            }
     }),
     tagTypes: ['Job'],
     endpoints: (builder) => ({
        getAllJobs: builder.query({
            query: ()=> ({
                url: '/api/jobs',
                method: 'GET'
            }),
            providesTags: ['Job']
        }),
        getJob: builder.query({
            query: (id) => ({
                url: `/api/jobs/job/${id}`,
                method: 'GET',
            }),
            providesTags: ['Job']
        }),
        createJob: builder.mutation({
            query: (formData) => ({
                url: '/api/jobs',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Job']
        })    
     })
})

export const { useGetAllJobsQuery, useGetJobQuery, useCreateJobMutation } = jobApi