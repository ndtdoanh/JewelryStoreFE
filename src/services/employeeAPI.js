import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";
import { selectToken } from "../slices/auth.slice";

export const employeeAPI = createApi({
  reducerPath: "EmployeeManagement",
  tagTypes: ["EmployeeList"],
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
    getAllEmployee: builder.query({
      query: () => `Employee/GetAllEmployee`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "employeeList", id }))
          : [{ type: "employeeList", id: " LIST " }],
    }),

    getEmployeeById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeeList", id }],
    }),

    addEmployee: builder.mutation({
      query: (employee) => ({
        url: "/Employee/AddNewEmployee",
        method: "POST",
        body: {
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          roleId: employee.role,
          // counterId: employee.counter,
          counterId: employee.counter || 0,
          employeeStatus: 1,
          employeeGender: employee.gender,
        },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    resetPassword: builder.mutation({
      query: ({ employeeId }) => ({
        url: `/Employee/ResetPassword/${employeeId}`,
        method: "POST",
        // body: {
        //   name: employee.name,
        //   email: employee.email,
        //   phone: employee.phone,
        //   roleId: employee.role,
        //   // counterId: employee.counter,
        //   counterId: employee.counter || 0,
        //   employeeStatus: 1,
        //   employeeGender: employee.gender,
        // },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    updatePassword: builder.mutation({
      query: ({ email, password, oldPassword }) => ({
        url: `Employee/UpdatePassword?email=${email}&oldPassword=${oldPassword}&newPassword=${password}`,
        method: "PUT",
        // body: { password: password, retypePassword: retypePassword },
      }),
    }),

    updateEmployee: builder.mutation({
      query: ({ employee }) => ({
        url: `/Employee/UpdateEmployee`,
        method: "PUT",
        body: {
          employeeId: employee.employeeId,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          counterId: employee.counterId || 0,
          roleId: employee.roleId,
          gender: employee.employeeGender,
          managedBy: employee.managedBy,
        },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `/Employee/DeleteEmployee/?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),

    changeEmployeeStatus: builder.mutation({
      query: (id) => ({
        url: `/Employee/UpdateStatus?uid=${id}`,
        method: "PUT",
        body: { Status: 0 },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllEmployeeQuery,
  useAddEmployeeMutation,
  useUpdatePasswordMutation,
  useUpdateEmployeeMutation,
  useChangeEmployeeStatusMutation,
  useRemoveEmployeeMutation,
  useResetPasswordMutation,
  useGetEmployeeByIdQuery,
} = employeeAPI;
