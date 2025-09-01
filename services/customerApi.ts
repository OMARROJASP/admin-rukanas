import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Customer = {
  cx_id: number,
            cx_first_name: string,
            cx_last_name: string,
            cx_email:string,
            cx_phone: string,
            cx_address: string,
            cx_city: string,
            cx_postal_code: string
}
export type responseCustomer = {
    data: Customer[];
    message: string;
}

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    endpoints: (builder) => ({
        getCustomers: builder.query<responseCustomer, void>({
            query: () => '/customer'
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
export const { useGetCustomersQuery, useCreateCustomerMutation } = customerApi;

