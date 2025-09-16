import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type Banner = {
    bnn_id: number,// para que se valide con el Table.tsx
    bnn_title: string,
    bnn_description: string,
    bnn_image_url_desktop:string,
    bnn_image_url_mobile:string,
    bnn_is_active:string,
    bnn_position: string
}
export type pagination = {
  totalItems: Banner[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
export type FilterCustomer = {
    customersTotal: Banner[];
    pagination: pagination;
}
export type responseBanners = {
    data: Banner[];
    message: string;
}
export type updateresponseBanners = {
    data: Banner;
    message: string;
}
export type responseCustomerFilter = {
    data: FilterCustomer;
    message: string;
}

export const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    endpoints: (builder) => ({
        getBanners: builder.query<responseBanners, void>({
            query: () => '/banner'
        }),
//         getCustomerFilter: builder.query<responseCustomerFilter, { text?: string, pag?:number }>({
//   query:({text, pag = 1} = {}) => {
//             let url = "/customer/filter";

//             if (pag && pag > 0) {
//                 url += `?page=${encodeURIComponent(pag.toString())}`;
//                //  url += text && text.trim() !== "" ? `&pag=${pag}` : `?pag=${pag}`;
//             }
    
//             if (text && text.trim() !== "") {
//                 url += `&text=${encodeURIComponent(text)}`;
//             }

//              url += `&limit=10`
//             return url;
//         },
// }),
   createBanner: builder.mutation<responseBanners, 
            FormData >({
        query: (formData) => ({
        url: "/banner",
        method: "POST",
        body:formData,
            }),
        }),

        getCBannerById: builder.query<Banner, number>({
                    query: (id) => `banner/${id}`
        }),

        updateBanner: builder.mutation<updateresponseBanners, {id?: number, body: FormData} >({
        query: ({id, body}) => ({
        url: `/banner/${id}`, 
        method: "PUT",
        body:body,
        }),
        
        }),


    }),
})
export const { useGetBannersQuery, useGetCBannerByIdQuery, useCreateBannerMutation, useUpdateBannerMutation } = bannerApi;

