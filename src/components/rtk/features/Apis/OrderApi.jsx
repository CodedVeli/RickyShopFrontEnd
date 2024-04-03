import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ricky-shop-server-3.onrender.com' }),
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => '/orders',
        }),
        getOrder: builder.query({
            query: (id) => `/orders/${id}`,
        }),
        addOrder: builder.mutation({
            query: ({order, accessToken}) => {
                return {
                    url: 'users/post_order',
                    method: 'POST',
                    body: order,
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  };
            },
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})      

export const { useGetAllOrdersQuery, useGetOrderQuery, useAddOrderMutation, useDeleteOrderMutation } = orderApi
export default orderApi