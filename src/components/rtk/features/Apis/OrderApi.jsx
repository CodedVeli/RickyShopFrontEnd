import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000' }),
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