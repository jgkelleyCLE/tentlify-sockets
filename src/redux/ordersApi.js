import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://tentlify-ecom.up.railway.app' }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: ()=> ({
                url: '/api/orders',
                method: 'GET',
            }),
            providesTags: ['Orders']
        }),
        getOrder: builder.query({
            query: (id) => ({
                url: `/api/orders/${id}`,
                method: 'GET',
            }),
            providesTags: ['Orders']
        })
    })
})

export const { useGetOrdersQuery, useGetOrderQuery } = ordersApi