import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export type Customer = {
  cx_id: number,// para que se valide con el Table.tsx
            cx_first_name: string,
            cx_last_name: string,
            cx_email:string,
            cx_phone: string,
            cx_address: string,
            cx_city: string,
            cx_postal_code: string
}
export type pagination = {
  totalItems: Customer[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}
export type FilterCustomer = {
    customersTotal: Customer[];
    pagination: pagination;
}
export type responseCustomer = {
    data: Customer[];
    message: string;
}
export type responseCustomerFilter = {
    data: FilterCustomer;
    message: string;
}

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    endpoints: (builder) => ({
        getCustomers: builder.query<responseCustomer, void>({
            query: () => '/customer'
        }),
        getCustomerFilter: builder.query<responseCustomerFilter, { text?: string, pag?:number }>({
  query:({text, pag = 1} = {}) => {
            let url = "/customer/filter";

            if (pag && pag > 0) {
                url += `?page=${encodeURIComponent(pag.toString())}`;
               //  url += text && text.trim() !== "" ? `&pag=${pag}` : `?pag=${pag}`;
            }
    
            if (text && text.trim() !== "") {
                url += `&text=${encodeURIComponent(text)}`;
            }

             url += `&limit=10`
            return url;
        },
}),

        
        createCustomer: builder.mutation<void, { name: string }>({
        query: (body) => ({
        url: "/customers",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),


    }),
})
export const { useGetCustomersQuery, useGetCustomerFilterQuery, useCreateCustomerMutation } = customerApi;

