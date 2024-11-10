import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

export const authApi = createApi({
  reducerPath: "authManagement",
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
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `Authorize/Login?email=${email}&password=${password}`,
        method: "POST",
        // body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/Authorize/Logout`,
        method: "POST",
        // body: { email, password },
      }),
    }),

    refreshToken: builder.mutation({
      query: ({ refreshToken, accessTokenToken }) => ({
        url: `/Authorize/RefreshAccessToken`,
        method: "POST",
        body: {
          refreshToken: refreshToken,
          accessTokenToken: accessTokenToken,
        }, // pass the refresh token in the body
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } =
  authApi;
