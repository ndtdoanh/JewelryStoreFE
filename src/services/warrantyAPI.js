import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const warrantyAPI = createApi({
  reducerPath: "warrantyManagement",
  tagTypes: ["WarrantyList"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState()); // Retrieve token from Redux state using selectToken selector
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
      headers.append("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllWarranty: builder.query({
      query: () => `Warranty/GetAllWarranty`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "warrantyManagement", id })),
            { type: "WarrantyList", id: "LIST" },
          ]
          : [{ type: "WarrantyList", id: "LIST" }],
    }),
    // getCustomerById: builder.query({
    //   query: () => `CustomerPolicy/GetCustomerPolicyByCustomerId`,
    //   providesTags: (result, _error, _arg) =>
    //     result
    //       ? [
    //         ...result.map(({ id }) => ({ type: "customerPolicyManagement", id })),
    //         { type: "CustomerPolicyList", id: "LIST" },
    //       ]
    //       : [{ type: "CustomerPolicyList", id: "LIST" }],
    // }),
    // createCustomer: builder.mutation({
    //   query: (newCustomer) => ({
    //     url: `/Customer/AddCustomer`,
    //     method: "POST",
    //     body: newCustomer,
    //   }),
    //   invalidatesTags: [{ type: "CustomerPolicyList", id: "LIST" }],
    // }),
    // updateDenyCustomer: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `CustomerPolicy/DenyCustomerPolicy?cpId=${id}`,
    //       method: "PUT",
    //     }
    //   },
    //   invalidatesTags: (result, _error, id) => [
    //     { type: "CustomerPolicyList", id: "LIST" },
    //   ],
    // }),
    // updateApproveCustomer: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `CustomerPolicy/ApproveCustomerPolicy?cpId=${id}`,
    //       method: "PUT",
    //     }
    //   },
    //   invalidatesTags: (result, _error, id) => [
    //     { type: "CustomerPolicyList", id: "LIST" },
    //   ],
    // }),
  }),
});

export const {
  useGetAllWarrantyQuery,
  // useCreateCustomerMutation,
//   useGetCustomerByIdQuery,
//   useUpdateApproveCustomerMutation,
//   useUpdateDenyCustomerMutation,

} = warrantyAPI;
