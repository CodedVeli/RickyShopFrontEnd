import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: () => '/products/categories',
        }),
        getCategory: builder.query({
            query: (category) => `/products/category/${category}`,
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: '/products/categories',
                method: 'POST',
                body: category,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (category) => ({
                url: `/products/categories/${category}`,
                method: 'DELETE',
            }),
        }),
        getSignleProductInCategory: builder.query({
            query: (category, id) => `/products/category/${category}/${id}`,
        }),
    }),
    })

    export const { useGetAllCategoriesQuery, useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation, useGetSignleProductInCategoryQuery } = categoriesApi
    export { categoriesApi }