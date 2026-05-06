import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API,
    prepareHeaders: (headers) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Order", "Category", "User", "Dashboard", "Cart"],
  endpoints: (builder) => ({}),
});
