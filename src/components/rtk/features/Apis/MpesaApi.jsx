import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const mpesaApi = createApi({
    reducerPath: 'mpesaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000' }),
    endpoints: (builder) => ({
        getAccessToken: builder.query({
            query: () => '/mpesa/get_access_token',
        }),
        lipaNaMpesa: builder.mutation({
            query: (payload) => ({
                url: 'mpesa/lipa_na_mpesa',
                method: 'POST',
                body: payload,
            }),
        }),
        validateMpesaPayment: builder.mutation({
            query: (payload) => ({
                url: '/mpesa/validate_mpesa_payment',
                method: 'POST',
                body: payload,
            }),
        }),
    }),
})

export const { useGetAccessTokenQuery, useLipaNaMpesaMutation, useValidateMpesaPaymentMutation } = mpesaApi
export default mpesaApi