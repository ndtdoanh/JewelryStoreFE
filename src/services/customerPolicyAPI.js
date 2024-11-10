import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const customerPolicyAPI = createApi({
  reducerPath: "customerPolicyManagement",
  tagTypes: ["CustomerPolicyList"],
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
    getAllCustomersPolicy: builder.query({
      query: () => `CustomerPolicy/GetAllCustomerPolicies`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "customerPolicyManagement",
                id,
              })),
              { type: "CustomerPolicyList", id: "LIST" },
            ]
          : [{ type: "CustomerPolicyList", id: "LIST" }],
    }),
    getAllCustomersPolicyByCustomerId: builder.query({
      query: ({ customerId }) =>
        `CustomerPolicy/GetCustomerPolicyByCustomerId?customerId=${customerId}`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "customerPolicyManagement",
                id,
              })),
              { type: "CustomerPolicyList", id: "LIST" },
            ]
          : [{ type: "CustomerPolicyList", id: "LIST" }],
    }),
    getCustomerByPhone: builder.query({
      query: () => `Customer/GetAllCustomers`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "customerPolicyManagement",
                id,
              })),
              { type: "CustomerPolicyList", id: "LIST" },
            ]
          : [{ type: "CustomerPolicyList", id: "LIST" }],
    }),
    createCustomerPolicy: builder.mutation({
      query: (newCustomer) => ({
        url: `/CustomerPolicy/CreateCustomerPolicy`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "CustomerPolicyList", id: "LIST" }],
    }),
    updateDenyCustomer: builder.mutation({
      query: (id) => {
        return {
          url: `CustomerPolicy/DenyCustomerPolicy?cpId=${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, _error, id) => [
        { type: "CustomerPolicyList", id: "LIST" },
      ],
    }),
    updateApproveCustomer: builder.mutation({
      query: (id) => {
        return {
          url: `CustomerPolicy/ApproveCustomerPolicy?cpId=${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, _error, id) => [
        { type: "CustomerPolicyList", id: "LIST" },
      ],
    }),
    updateUsedPolicy: builder.mutation({
      query: ({ CPId }) => {
        return {
          url: `/CustomerPolicy/UpdatePolicyStatus?CPId=${CPId}`,
          method: "PUT",
        };
      },
      invalidatesTags: (result, _error, id) => [
        { type: "CustomerPolicyList", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetAllCustomersPolicyQuery,
  useCreateCustomerPolicyMutation,
  useLazyGetAllCustomersPolicyByCustomerIdQuery,
  useLazyGetAllCustomersPolicyQuery,
  useUpdateApproveCustomerMutation,
  useUpdateUsedPolicyMutation,
  useUpdateDenyCustomerMutation,
} = customerPolicyAPI;
