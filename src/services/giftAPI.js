import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

// Define a service using a base URL and expected endpoints
export const giftAPI = createApi({
  reducerPath: "giftManagement",
  tagTypes: ["GiftManagement"],
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
    getAllGift: builder.query({
      query: () => `Gift/GetAllGifts`,
      providesTags: (result, _error, _arg) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: "giftManagement", id })),
            { type: "GiftList", id: "LIST" },
          ]
          : [{ type: "GiftList", id: "LIST" }],
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
    createGift: builder.mutation({
      query: (newCustomer) => ({
        url: `Gift/CreateNewGift`,
        method: "POST",
        body: newCustomer,
      }),
      invalidatesTags: [{ type: "GiftList", id: "LIST" }],
    }),
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
  useGetAllGiftQuery,
  useCreateGiftMutation,
//   useGetCustomerByIdQuery,
//   useUpdateApproveCustomerMutation,
//   useUpdateDenyCustomerMutation,

} = giftAPI;
