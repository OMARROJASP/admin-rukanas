import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Category = {
            cat_id: number, // para que se valide con el Table.tsx
            cat_name: string,
            cat_description:string,
            cat_imageUrl: string,
            cat_status: string,
            cat_area: string

}
export type responseCategory = {
    data: Category[];
    message: string;
}

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    endpoints: (builder) => ({
        getCategory: builder.query<responseCategory, void>({
            query: () => '/category'
        }),

        createCategory: builder.mutation<void, { name: string }>({
        query: (body) => ({
        url: "/category",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),


    }),

   
})
export const { useGetCategoryQuery, useCreateCategoryMutation } = categoryApi;

