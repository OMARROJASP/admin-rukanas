import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Category = {
            cat_id: number,
            cat_name: string,
            cat_description:string,
            cat_imageUrl: File | string,
            cat_status: string,
            cat_area: string

}
export type responseCategory = {
    data: Category[] | Category;
    message: string;
}

export type responseCategoryUpdate = {
    data:  Category;
    message: string;
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    endpoints: (builder) => ({
        getCategory: builder.query<responseCategory, void>({
            query: () => '/category'
        }),

        getCategoryById: builder.query<Category, number>({
            query: (id) => `category/${id}`
        }),

        createCategory: builder.mutation<responseCategory, 
            FormData >({
        query: (formData) => ({
        url: "/category",
        method: "POST",
        body:formData,
        }),
        
        }),
        updateCategory: builder.mutation<responseCategoryUpdate, {id?: number, body: FormData} >({
        query: ({id, body}) => ({
        url: `/category/${id}`, 
        method: "PUT",
        body:body,
        }),
        
        }),


    }),

   
})
export const { useGetCategoryQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation, useCreateCategoryMutation } = categoryApi;

