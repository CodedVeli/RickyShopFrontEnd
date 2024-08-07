import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const mpesaApi = createApi({
    reducerPath: 'mpesaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ricky-shop-server-3.onrender.com' }),
    endpoints: (builder) => ({
       
        lipaNaMpesa: builder.mutation({
            query: (payload) => ({
                url: 'mpesa/lipa_na_mpesa',
                method: 'POST',
                body: payload,
            }),
        }),            

        handleCallback: builder.query({
            query: () => ({
                url: 'mpesa/callback',
                method: 'POST',
            }),
        }),
    }),
})

export const {  useLipaNaMpesaMutation, useHandleCallbackQuery } = mpesaApi
export default mpesaApi