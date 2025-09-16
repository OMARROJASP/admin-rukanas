// import { createSlice } from "@reduxjs/toolkit";

import { categoryApi } from "@/services/categoryApi";
import { customerApi } from "@/services/customerApi";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/features/categories/categorySlice";
import bannerReducer from "@/features/banner/bannerSlice";
import { bannerApi } from "@/services/bannerApi";
import { authApi } from "@/services/authApi";
// interface customerState {
//     id:number | null;
//     first_name:string | null;
//     last_name:string | null;
//     email:string | null;
//     phone:string | null;
//     address:string | null;
//     city:string | null;
//     // state:string | null;
//     zip_code:string | null;
//     // country:string | null;
//     // created_at:string | null;
//     // updated_at:string | null;
// }

// interface listCustomerState {
//     customers: customerState[] | null;
// }

// const initialState: listCustomerState = {
//     customers: null,
// }

// const userCustomer = createSlice({
//     name: 'customer',
//     initialState,
//     reducers: {
//         setCustomers(state, action) {

//     }
//     }
// })


export const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        category: categoryReducer,
        banner: bannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customerApi.middleware,categoryApi.middleware, bannerApi.middleware, authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;