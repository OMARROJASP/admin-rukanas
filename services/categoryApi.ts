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
export type pagination = {
  totalItems: Category[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
export type FilterCategory = {
    categoriesTotal: Category[];
    pagination: pagination;
}
export type responseCategoryFilter = {
    data: FilterCategory;
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
        getCategoriesFilter: builder.query<responseCategoryFilter, { text?: string, pag?: number }>({
        query:({text, pag = 1} = {}) => {
            let url = "/category/filter";

            if (pag && pag > 0) {
                url += `?page=${encodeURIComponent(pag.toString())}`;
               //  url += text && text.trim() !== "" ? `&pag=${pag}` : `?pag=${pag}`;
            }
    
            if (text && text.trim() !== "") {
                url += `&text=${encodeURIComponent(text)}`;
            }

            url += `&limit=10`
            return url;
        }
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
export const { useGetCategoryQuery, useGetCategoryByIdQuery, useUpdateCategoryMutation, useGetCategoriesFilterQuery, useCreateCategoryMutation } = categoryApi;

